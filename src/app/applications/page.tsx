import Link from 'next/link';
import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Briefcase, ArrowRight } from 'lucide-react';

export const metadata = { title: 'Applications · Tensor Lab' };

const topics = [
  { title: 'Image Compression', href: '/applications/image', desc: 'CP and Tucker for color images and video' },
  { title: 'EEG / fMRI', href: '/applications/eeg', desc: 'Channel × time × subject tensors' },
  { title: 'Recommender Systems', href: '/applications/recsys', desc: 'Multi-way user × item × context' },
  { title: 'Video Analytics', href: '/applications/video', desc: 'Action recognition, anomaly detection' },
  { title: 'Remote Sensing', href: '/applications/remote-sensing', desc: 'Hyperspectral unmixing' },
];

export default function ApplicationsPage() {
  return (
    <ContentPage
      category="Module"
      title="Engineering Applications"
      subtitle="From the lab to production"
      description="Tensor decompositions are widely used in engineering. This module walks through major application domains with case studies."
    >
      <Section title="Topics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 not-prose">
          {topics.map((t) => (
            <Link key={t.href} href={t.href}>
              <GlassCard className="p-5 group h-full" hover>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-3 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Open
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
