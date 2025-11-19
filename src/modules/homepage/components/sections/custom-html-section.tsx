'use client'

import { HomepageSection } from '../../types'

interface CustomHtmlSectionProps {
  section: HomepageSection
}

export function CustomHtmlSection({ section }: CustomHtmlSectionProps) {
  if (!section.content) return null

  return (
    <section className="py-12">
      <div
        className="custom-html-content"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </section>
  )
}
