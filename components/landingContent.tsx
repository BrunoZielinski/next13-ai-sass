'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const testimonials = [
  {
    avatar: 'JD',
    name: 'John Doe',
    title: 'Software Engineer',
    description: "This is the best application I've used!",
  },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-white">
        Testimonials
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testimonials.map(testimonial => (
          <Card
            key={`${testimonial.name}-${testimonial.title}-${testimonial.description}`}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-sm text-zinc-400">{testimonial.title}</p>
                </div>
              </CardTitle>

              <CardContent className="px-0 pt-4 ">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
