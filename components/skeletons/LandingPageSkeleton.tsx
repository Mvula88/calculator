import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function LandingPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Skeleton className="h-10 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Skeleton className="h-8 w-64 mx-auto mb-6 rounded-full" />
            <Skeleton className="h-16 w-full max-w-3xl mx-auto mb-4" />
            <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-8" />
            <Skeleton className="h-24 w-full max-w-3xl mx-auto mb-10 rounded-lg" />

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-white/95">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-6 mx-auto mb-2" />
                    <Skeleton className="h-5 w-24 mx-auto mb-1" />
                    <Skeleton className="h-3 w-32 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-64 rounded-md" />
              <Skeleton className="h-12 w-48 rounded-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Country Selection Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto mb-4" />
            <Skeleton className="h-8 w-80 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="hover:shadow-xl transition-all">
                <CardContent className="p-6 text-center">
                  <Skeleton className="h-12 w-12 mx-auto mb-3 rounded-full" />
                  <Skeleton className="h-6 w-24 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto mb-2" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-28 mx-auto" />
                    <Skeleton className="h-3 w-28 mx-auto" />
                    <Skeleton className="h-3 w-28 mx-auto" />
                  </div>
                  <Skeleton className="h-4 w-20 mx-auto mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Import Basics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-6 w-6" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-4" />
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Skeleton className="h-5 w-32 mb-3" />
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map((j) => (
                        <Skeleton key={j} className="h-4 w-full" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-10 w-10 mb-3" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Skeleton className="h-12 w-64 mx-auto rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  )
}