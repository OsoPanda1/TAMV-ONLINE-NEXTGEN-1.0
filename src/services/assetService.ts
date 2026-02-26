import { 
  User, 
  BookOpen, 
  Zap, 
  Globe, 
  Shield, 
  Cpu, 
  Database, 
  Award,
  MessageSquare,
  TrendingUp,
  Layout,
  Layers,
  Activity,
  Lock,
  Eye,
  Terminal,
  Search,
  Settings,
  Bell,
  Home,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Play,
  Box,
  Coins,
  Palette,
  Gavel,
  Scale,
  CheckCircle,
  AlertCircle,
  FileText,
  Archive,
  Download,
  Music,
  Video,
  History,
  AlertTriangle,
  FileCheck,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Filter,
  Brain,
  Clock
} from "lucide-react";

export const TAMV_ASSETS = {
  icons: {
    roles: {
      citizen: User,
      builder: Cpu,
      mentor: Brain,
      council: Shield
    },
    domains: {
      social: MessageSquare,
      learn: BookOpen,
      economy: Zap,
      gov: Gavel,
      xr: Globe,
      ai: Brain,
      core: Database
    }
  },
  illustrations: {
    social: "https://picsum.photos/seed/tamv-social/1200/800",
    learn: "https://picsum.photos/seed/tamv-learn/1200/800",
    economy: "https://picsum.photos/seed/tamv-economy/1200/800",
    gov: "https://picsum.photos/seed/tamv-gov/1200/800",
    xr: "https://picsum.photos/seed/tamv-xr/1200/800",
    ai: "https://picsum.photos/seed/tamv-ai/1200/800",
    core: "https://picsum.photos/seed/tamv-core/1200/800"
  },
  videos: {
    intro: "https://v0.tamv-online-website.vercel.app/intro.mp4", // Mock URL
    feature: (domain: string) => `https://v0.tamv-online-website.vercel.app/features/${domain}.mp4`
  },
  ambience: {
    social: "https://v0.tamv-online-website.vercel.app/audio/social-lounge.mp3",
    learn: "https://v0.tamv-online-website.vercel.app/audio/utamv-hall.mp3",
    xr: "https://v0.tamv-online-website.vercel.app/audio/dreamspace-ambient.mp3"
  }
};

export type UserRole = "aprendiz" | "creador" | "explorador" | "organizacion";

export interface OnboardingState {
  completed: boolean;
  role?: UserRole;
  step: number;
}
