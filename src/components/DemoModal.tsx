import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, X, Loader2 } from "lucide-react";
import { submitContactForm } from "@/services/api";

interface DemoModalContextType {
  openDemoModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextType>({ openDemoModal: () => {} });

export const useDemoModal = () => useContext(DemoModalContext);

export const DemoModalProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ name: "", store: "", phone: "", email: "", storeType: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openDemoModal = useCallback(() => {
    setShowModal(true);
    requestAnimationFrame(() => setModalVisible(true));
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setError("");
      setForm({ name: "", store: "", phone: "", email: "", storeType: "" });
    }, 300);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitContactForm({
        full_name: form.name,
        store_name: form.store,
        phone: form.phone,
        email: form.email,
        store_type: form.storeType,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DemoModalContext.Provider value={{ openDemoModal }}>
      {children}
      {showModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-300 ${modalVisible ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"}`}
          onClick={closeModal}
        >
          <div
            className={`relative w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-2xl transition-all duration-300 ${modalVisible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-1 text-xl font-bold text-foreground">Schedule a Demo</h3>
            <p className="mb-5 text-sm text-muted-foreground">Tell us about your store and we'll show you how A2Z POS can help.</p>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-brand-green" />
                <h4 className="mb-2 text-xl font-bold text-foreground">Thank You!</h4>
                <p className="body-text">We'll be in touch shortly to schedule your demo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Store Name *</label>
                  <input required value={form.store} onChange={(e) => setForm({ ...form, store: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Phone *</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Store Type *</label>
                  <select required value={form.storeType} onChange={(e) => setForm({ ...form, storeType: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                    <option value="">Select store type</option>
                    <option value="liquor">Liquor Store</option>
                    <option value="neighborhood">Neighborhood Market</option>
                  </select>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary-gradient w-full text-center flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Submitting..." : "Get a Demo"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </DemoModalContext.Provider>
  );
};
