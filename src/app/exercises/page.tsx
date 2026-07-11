import { ContentPage, Section } from '@/components/content-page';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Check, Lock } from 'lucide-react';

export const metadata = { title: 'Exercises · Tensor Lab' };

const exercises = [
  { level: 'Beginner', title: 'Implement CP-ALS for 3rd-order tensors', status: 'open', time: '1h' },
  { level: 'Beginner', title: 'Compute singular values of each mode-n unfolding', status: 'open', time: '30m' },
  { level: 'Beginner', title: 'Build a low-rank image-compression pipeline', status: 'open', time: '2h' },
  { level: 'Intermediate', title: 'Implement HOSVD and verify quasi-optimality', status: 'open', time: '2h' },
  { level: 'Intermediate', title: 'Fit CP to the MovieLens-1M user × movie × time tensor', status: 'open', time: '4h' },
  { level: 'Intermediate', title: 'Compare CP, Tucker, and TT for hyperspectral unmixing', status: 'open', time: '6h' },
  { level: 'Advanced', title: 'TT-format MNIST classifier with PyTorch', status: 'open', time: '8h' },
  { level: 'Advanced', title: 'Tensor Robust PCA on surveillance video', status: 'open', time: '6h' },
  { level: 'Research', title: 'Implement iPEPS with CTM environment', status: 'open', time: '20h' },
  { level: 'Research', title: 'Reproduce a recent TT-LoRA paper on a small LLM', status: 'open', time: '30h' },
];

export default function ExercisesPage() {
  return (
    <ContentPage
      category="Module"
      title="Exercises"
      subtitle="Hands-on problems at every level"
      description="Reinforce your understanding with guided exercises ranging from beginner to research-level."
    >
      <Section title="Exercises">
        <div className="space-y-2 not-prose">
          {exercises.map((e, i) => (
            <GlassCard key={i} className="p-4" hover>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{e.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px]">{e.level}</Badge>
                    <span className="text-xs text-muted-foreground">~{e.time}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>
    </ContentPage>
  );
}
