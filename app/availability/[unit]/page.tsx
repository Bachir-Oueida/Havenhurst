import { notFound } from "next/navigation";
import { UnitDetailClient } from "./unit-detail-client";
import { getUnitBySlug, UNITS } from "@/lib/units";

export function generateStaticParams() {
  return UNITS.map((u) => ({ unit: u.unitNumber }));
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit: slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) {
    notFound();
  }

  return <UnitDetailClient unit={unit} />;
}
