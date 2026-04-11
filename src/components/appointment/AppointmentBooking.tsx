import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "gatsby";
import { CheckCircle, Clock, Video, ChevronLeft, ChevronRight, Globe, Calendar, User, X } from "lucide-react";
import { SchedulingSettingsType } from "@/types/scheduling";
import { generateTimeSlots } from "@/utils/scheduling";

const API_BASE = "https://a2ztemp-78490f.ingress-erytho.ewp.live/wp-json/a2z-appointments/v1";

const today = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

function getNextBookableDates(settings: SchedulingSettingsType, fromDate: Date): Set<string> {
  const result: Set<string> = new Set();
  let date = new Date(fromDate);
  if (settings.exclude_today) date.setDate(date.getDate() + 1);
  while (result.size < settings.range) {
    const dayOfWeek = date.getDay();
    if ((!settings.exclude_saturday || dayOfWeek !== 6) && (!settings.exclude_sunday || dayOfWeek !== 0)) {
      result.add(date.toDateString());
    }
    date.setDate(date.getDate() + 1);
  }
  return result;
}

const eventInfo = {
  team: "Team A2Z",
  title: "Q&A with A2Z Rep",
  duration: "30 min",
  type: "Meeting",
  description: "Join us for an engaging demo where we'll showcase A2Z's features and benefits. You'll hear success stories and have the opportunity to ask questions.",
};

const AppointmentBooking = () => {
  const [settings, setSettings] = useState<SchedulingSettingsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", retailType: "", currentPOS: "" });
  const [formError, setFormError] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const [lastBookedDate, setLastBookedDate] = useState<string | null>(null);
  const [lastBookedTime, setLastBookedTime] = useState<string | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const offset = (firstDayOfMonth + 6) % 7;

  const bookableDatesSet = useMemo(() => (settings ? getNextBookableDates(settings, today) : new Set<string>()), [settings]);
  const isBookable = (day: number) => bookableDatesSet.has(new Date(currentYear, currentMonth, day).toDateString());

  const timeSlots = useMemo(() => (settings ? generateTimeSlots(settings) : []), [settings]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE}/settings`);
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setSettings({
          range: data.range,
          exclude_saturday: Boolean(data.exclude_saturday),
          exclude_sunday: Boolean(data.exclude_sunday),
          exclude_today: Boolean(data.exclude_today),
          meeting_duration: data.meeting_duration,
          start_time: data.start_time.slice(0, 5),
          end_time: data.end_time.slice(0, 5),
          buffer_before: data.buffer_before,
          buffer_after: data.buffer_after,
          breaks: data.breaks || [],
        });
      } catch (err) {
        setError("Failed to load scheduling settings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; phone?: string } = {};
    if (!form.name.trim()) errors.name = "Name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = "Invalid email";
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings || !validateForm()) return;
    setIsSubmitting(true);
    setSubmitError(null);

    let appointmentDate = "";
    let formattedStartTime = "";
    if (selectedDate && selectedTime) {
      const [time, period] = selectedTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period.toLowerCase() === "pm" && hours !== 12) hours += 12;
      if (period.toLowerCase() === "am" && hours === 12) hours = 0;
      const pad = (n: number) => n.toString().padStart(2, "0");
      appointmentDate = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`;
      formattedStartTime = `${pad(hours)}:${pad(minutes)}:00`;
    }

    const requestData = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      retail_type: form.retailType || undefined,
      current_pos: form.currentPOS || undefined,
      appointment_date: appointmentDate,
      start_time: formattedStartTime,
      ...(editingAppointment?.id ? { status: "scheduled" } : {}),
    };

    try {
      const url = editingAppointment?.id
        ? `${API_BASE}/appointments/${editingAppointment.id}`
        : `${API_BASE}/appointments`;
      const method = editingAppointment?.id ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify(requestData),
      });
      const text = await response.text();
      const data = text.trim() ? JSON.parse(text) : null;
      if (!response.ok) throw new Error(data?.message || `Server error: ${response.status}`);
      if (!data?.id) throw new Error("Server response missing appointment ID");

      setAppointmentId(data.id);
      setLastBookedDate(appointmentDate);
      setLastBookedTime(formattedStartTime);
      setStep(4);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to book appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeAppointment = async () => {
    if (!appointmentId) return;
    try {
      const response = await fetch(`${API_BASE}/appointments/${appointmentId}`);
      if (!response.ok) throw new Error("Failed to fetch appointment");
      const data = await response.json();
      setEditingAppointment(data);
      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        retailType: data.retail_type || "",
        currentPOS: data.current_pos || "",
      });
      setStep(2);
    } catch (err) {
      console.error("Error fetching appointment:", err);
    }
  };

  const handleCancelAppointment = async () => {
    setIsCancelling(true);
    try {
      const response = await fetch(`${API_BASE}/appointments/${appointmentId}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to cancel");
      setShowCancelModal(false);
      resetBooking();
    } catch {
      // error handling silently
    } finally {
      setIsCancelling(false);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", email: "", phone: "", retailType: "", currentPOS: "" });
    setFormError({});
    setEditingAppointment(null);
  };

  const { confirmationTimeRange, confirmationDateString } = useMemo(() => {
    if (!lastBookedDate || !lastBookedTime || !settings) return { confirmationTimeRange: "", confirmationDateString: "" };
    const [year, month, day] = lastBookedDate.split("-").map(Number);
    const [startHour, startMinute] = lastBookedTime.split(":").map(Number);
    const localStart = new Date(year, month - 1, day, startHour, startMinute);
    const localEnd = new Date(localStart.getTime() + (settings.meeting_duration || 30) * 60000);
    const fmt = (d: Date) => {
      let h = d.getHours();
      const m = d.getMinutes();
      const ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ap}`;
    };
    return {
      confirmationTimeRange: `${fmt(localStart)} - ${fmt(localEnd)}`,
      confirmationDateString: localStart.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    };
  }, [lastBookedDate, lastBookedTime, settings]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 flex items-center justify-center" style={{ minHeight: 520 }}>
        <div className="text-lg text-primary">Loading scheduling options...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 flex items-center justify-center" style={{ minHeight: 520 }}>
        <div className="text-lg text-destructive">{error}</div>
      </div>
    );
  }

  // Step 4: Confirmation
  if (step === 4) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 md:p-12 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-7 w-7 text-brand-green" />
          <span
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
          >
            You are scheduled
          </span>
        </div>
        <p className="text-muted-foreground mb-8">A calendar invitation has been sent to your email address.</p>

        <div className="rounded-xl border border-border bg-background px-8 py-6 mb-8 w-full max-w-md text-left">
          <h3 className="font-bold text-lg text-foreground mb-4">Schedule Details</h3>
          <div className="flex items-center gap-2 mb-3 text-foreground text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            {form.name || "Name"}
          </div>
          <div className="flex items-center gap-2 mb-3 text-foreground text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            {confirmationTimeRange && confirmationDateString ? `${confirmationTimeRange}, ${confirmationDateString}` : ""}
          </div>
          <div className="flex items-center gap-2 mb-3 text-foreground text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            PST
          </div>
          <div className="flex items-center gap-2 text-foreground text-sm">
            <Video className="h-4 w-4 text-muted-foreground" />
            Web conferencing details to follow.
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleChangeAppointment} className="btn-primary-gradient !px-6">
            Change Appointment
          </button>
          <button
            ref={cancelBtnRef}
            onClick={() => setShowCancelModal(true)}
            className="rounded-lg border-2 border-destructive px-6 py-2.5 text-sm font-bold text-destructive transition-all hover:bg-destructive/10"
          >
            Cancel Appointment
          </button>
        </div>

        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-card rounded-xl border border-border shadow-lg p-8 w-full max-w-sm relative">
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={() => !isCancelling && setShowCancelModal(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex flex-col items-center">
                <p className="text-lg font-medium text-foreground mb-6 text-center">
                  Confirm Cancellation of Appointment?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleCancelAppointment}
                    disabled={isCancelling}
                    className="rounded-lg border border-primary px-6 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition disabled:opacity-50"
                  >
                    {isCancelling ? "Cancelling..." : "Yes"}
                  </button>
                  <button
                    onClick={() => setShowCancelModal(false)}
                    disabled={isCancelling}
                    className="btn-primary-gradient !px-6 !py-2 disabled:opacity-50"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Steps 1-3
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col md:flex-row" style={{ minHeight: 520 }}>
      {/* Sidebar - Event Info */}
      <div className="p-6 md:p-8 md:border-r border-b md:border-b-0 border-border md:w-1/3">
        <Link to="/" className="text-sm font-bold text-primary">A2Z POS</Link>
        <p className="mt-4 text-sm text-muted-foreground">{eventInfo.team}</p>
        <h3
          className="mt-1 text-xl font-bold bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
        >
          {eventInfo.title}
        </h3>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> {eventInfo.duration}
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Video className="h-4 w-4" /> {eventInfo.type}
        </div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{eventInfo.description}</p>
        {(step === 2 || step === 3) && selectedDate && selectedTime && (
          <button
            className="mt-4 text-sm font-medium text-primary underline"
            onClick={() => { setStep(2); setSelectedTime(null); }}
          >
            Change Date
          </button>
        )}
        <div className="mt-auto pt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <a href="/terms-of-service" className="text-primary underline">Terms of Service</a>
          <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>
          <a href="/cookie-policy" className="text-primary underline">Cookie Policy</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative" style={{ minHeight: 400, maxHeight: 520 }}>
        {/* Step 1 & 2: Calendar + Time Slots */}
        <div className={`flex h-full transition-opacity duration-300 ${step === 3 ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"}`}>
          {/* Calendar */}
          <div className={`p-6 md:p-8 transition-all duration-300 ${step === 2 ? "w-1/2" : "w-full md:w-2/3 mx-auto"}`}>
            <h3 className="text-lg font-semibold text-foreground mb-4">Select a Date & Time</h3>

            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition">
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="text-sm font-medium text-foreground">{months[currentMonth]} {currentYear}</span>
              <button onClick={handleNextMonth} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 mb-2">
              {daysOfWeek.map((d) => (
                <div key={d} className="text-xs font-semibold text-center text-muted-foreground">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: offset }).map((_, i) => (<div key={`e-${i}`} />))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                const bookable = isBookable(day);
                const selected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear;
                return (
                  <div key={day} className="flex justify-center">
                    <button
                      disabled={!bookable}
                      onClick={() => { setSelectedDate(new Date(currentYear, currentMonth, day)); setSelectedTime(null); setStep(2); }}
                      className={`w-9 h-9 text-sm rounded-full transition font-medium
                        ${selected ? "bg-primary text-primary-foreground font-bold" : bookable ? "bg-primary/10 text-primary font-bold hover:bg-primary/20" : "text-muted-foreground/50"}
                        ${!bookable ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="h-3 w-3" /> Pacific Standard Time
            </div>
          </div>

          {/* Time Slots */}
          {step === 2 && selectedDate && (
            <div className="w-1/2 border-l border-border p-6 md:p-8 overflow-y-auto" style={{ maxHeight: 520 }}>
              <p className="text-sm font-medium text-muted-foreground mb-4">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <div className="flex flex-col gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => { setSelectedTime(slot); setStep(3); }}
                    className={`w-full py-2 rounded-lg border text-sm font-bold transition
                      ${selectedTime === slot ? "bg-primary text-primary-foreground border-primary" : "border-primary text-primary bg-background hover:bg-primary/5"}`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Booking Form */}
        <div className={`absolute inset-0 flex items-start justify-center transition-opacity duration-300 p-6 md:p-8 overflow-y-auto ${step === 3 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {step === 3 && selectedDate && selectedTime && (
            <div className="w-full max-w-md">
              <h3 className="text-xl font-semibold text-foreground mb-6">Enter details</h3>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Name <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setFormError({}); }}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground bg-background outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${formError.name ? "border-destructive" : "border-input"}`}
                  />
                  {formError.name && <p className="text-xs text-destructive mt-1">{formError.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setFormError({}); }}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground bg-background outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${formError.email ? "border-destructive" : "border-input"}`}
                  />
                  {formError.email && <p className="text-xs text-destructive mt-1">{formError.email}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Phone <span className="text-destructive">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => { setForm({ ...form, phone: e.target.value }); setFormError({}); }}
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-foreground bg-background outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${formError.phone ? "border-destructive" : "border-input"}`}
                  />
                  {formError.phone && <p className="text-xs text-destructive mt-1">{formError.phone}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Retail Type</label>
                  <select
                    name="retailType"
                    value={form.retailType}
                    onChange={(e) => setForm({ ...form, retailType: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">--Select--</option>
                    <option value="convenience-store">Convenience Store</option>
                    <option value="liquor-store">Liquor Store</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Current POS</label>
                  <select
                    name="currentPOS"
                    value={form.currentPOS}
                    onChange={(e) => setForm({ ...form, currentPOS: e.target.value })}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">--Select--</option>
                    <option value="square">Square</option>
                    <option value="clover">Clover</option>
                    <option value="shopify">Shopify</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  By proceeding, you confirm that you have read and agree to our Terms of Service and Privacy Policy.
                </p>
                {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-gradient w-full text-center mt-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Event"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
