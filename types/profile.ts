export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Profile {
  name: string
  displayName: string
  title: string
  tagline: string
  bio: string
  location: string
  email: string
  avatar_url: string
  available_for_work: boolean
  years_of_experience: number
  socials: SocialLink[]
}
