import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import "./globals.css";

const instrumentSans = { variable: "font-sans" };
const inter = { variable: "font-body" };
const jetbrainsMono = { variable: "font-mono" };

export const metadata: Metadata = {
  title: "FlowBoard — Create Anywhere. Use Everywhere. Connect Everything.",
  description:
    "FlowBoard is a connected creative workspace. Draw, write, design and plan in specialized environments that stay wired to one shared body of work.",
};

/**
 * Sets the `dark` class on <html> before React hydrates, using the
 * user's saved preference or their OS setting. Runs instantaneously
 * in <head> with zero artificial delay or layout blocking.
 */
const noFlashThemeScript = `
(function () {
  try {
    var stored = localStorage.getItem("flowboard-theme");
    var isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body
        className={`${instrumentSans.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background font-body text-ink antialiased`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <ToastProvider>{children}</ToastProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
