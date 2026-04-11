import React from "react";
import Layout from "./src/components/Layout";

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" });
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
