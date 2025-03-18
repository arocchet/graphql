"use client"
import { ProfileGrid } from "@/components/ui/profile-grid";


export default function DocsPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <section>
        <div className="mt-16 mx-4">
          <ProfileGrid id={303} />
        </div>
      </section>
    </div>
  );
}
  