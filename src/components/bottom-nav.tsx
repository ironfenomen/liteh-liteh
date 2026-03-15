"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FlaskConical,
  Scan,
  Home,
  Ambulance,
  Stethoscope,
} from "lucide-react";

const items = [
  { href: "/analizy", label: "Анализы", Icon: FlaskConical },
  { href: "/uzi", label: "УЗИ", Icon: Scan },
  { href: "/medsestra", label: "Анализы на дому", Icon: Home },
  { href: "/vyezd-vracha", label: "Вызвать врача", Icon: Ambulance },
  { href: "/vraci", label: "Прием врачей", Icon: Stethoscope },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-emerald-100 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(15,23,42,0.05)] md:hidden">
      <div className="grid w-full grid-cols-5">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          const iconColor = active ? "text-emerald-600" : "text-emerald-300";
          const textColor = active
            ? "text-slate-900 font-medium"
            : "text-slate-600";

          return (
            <Link
              key={href}
              href={href}
              className="flex min-h-[48px] flex-col items-center justify-center gap-1 py-3"
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                className={iconColor}
                aria-hidden="true"
              />
              <span
                className={`px-0.5 text-[10px] leading-tight text-center ${textColor}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

