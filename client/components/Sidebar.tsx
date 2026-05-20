"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  LayoutDashboard,
  Upload,
  BarChart3,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] =
    useState(false);
const router = useRouter();
  const menu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      id: "dashboard",
    },

    {
      label: "Analytics",
      icon: BarChart3,
      id: "analytics",
    },

    {
      label: "Uploads",
      icon: Upload,
      id: "uploads",
    },

    {
      label: "Feedbacks",
      icon: MessageSquare,
      id: "feedbacks",
    },
  ];
const scrollToSection = (
  id: string
) => {
  // analytics page navigation
  if (id === "analytics") {
    router.push("/insights");

    setOpen(false);

    return;
  }

  const section =
    document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }

  setOpen(false);
};

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="
          lg:hidden
          fixed top-0 left-0 right-0
          z-50
          flex items-center justify-between
          border-b border-white/10
          bg-black/80
          backdrop-blur-xl
          px-5 py-4
        "
      >
        <h1 className="text-2xl font-bold">
          AI Analyzer
        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
            rounded-xl
            border border-white/10
            bg-white/5
            p-2
          "
        >
          <Menu size={22} />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden lg:flex
          flex-col
          w-72
          bg-zinc-950/80
          backdrop-blur-xl
          border-r border-white/10
          p-6
          fixed left-0 top-0
          h-screen
        "
      >
        <h1 className="text-3xl font-bold mb-12">
          AI Analyzer
        </h1>

        <div className="space-y-3">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() =>
                  scrollToSection(
                    item.id
                  )
                }
                className="
                  w-full
                  flex items-center gap-4
                  px-4 py-4
                  rounded-2xl
                  text-zinc-300
                  hover:bg-white/5
                  hover:text-white
                  transition
                "
              >
                <Icon size={20} />

                <span className="font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto">
          <div
            className="
              rounded-3xl
              bg-gradient-to-br
              from-blue-500
              to-purple-600
              p-5
            "
          >
            <p className="text-sm text-white/80">
              AI Feedback Intelligence
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Premium Dashboard
            </h2>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setOpen(false)
              }
              className="
                fixed inset-0
                z-50
                bg-black/60
                backdrop-blur-sm
                lg:hidden
              "
            />

            {/* Drawer */}
            <motion.div
              initial={{
                x: -300,
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: -300,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                fixed top-0 left-0
                z-50
                h-screen
                w-72
                bg-zinc-950
                border-r border-white/10
                p-6
                lg:hidden
              "
            >
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold">
                  AI Analyzer
                </h1>

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {menu.map((item) => {
                  const Icon =
                    item.icon;

                  return (
                    <button
                      key={item.label}
                      onClick={() =>
                        scrollToSection(
                          item.id
                        )
                      }
                      className="
                        w-full
                        flex items-center gap-4
                        px-4 py-4
                        rounded-2xl
                        text-zinc-300
                        hover:bg-white/5
                        hover:text-white
                        transition
                      "
                    >
                      <Icon size={20} />

                      <span className="font-medium">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}