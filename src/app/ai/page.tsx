import Link from 'next/link';
import { ContentPage, Section } from '@/components/content-page';
import { Math as MathExpr } from '@/components/ui/math';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Brain, ArrowRight } from 'lucide-react';

export const metadata = { title: 'AI Applications · Tensor Lab' };

const topics = [
  { title: 'Large Language Models', href: '/ai/llm', desc: 'TT-format attention, LLM compression', color: 'from-rose-500 to-orange-500' },
  { title: 'Transformer Compression', href: '/ai/transformer', desc: 'TT and Tucker layers in transformers', color: 'from-blue-500 to-indigo-500' },
  { title: 'LoRA & PEFT', href: '/ai/lora', desc: 'Tensorized low-rank adaptation', color: 'from-violet-500 to-purple-500' },
  { title: 'Mixture of Experts', href: '/ai/moe', desc: 'TT-decomposed expert weights', color: 'from-fuchsia-500 to-pink-500' },
  { title: 'Diffusion Models', href: '/ai/diffusion', desc: 'Low-rank UNet weights', color: 'from-amber-500 to-orange-500' },
  { title: 'Recommender Systems', href: '/ai/recsys', desc: 'CP/Tucker for collaborative filtering', color: 'from-emerald-500 to-teal-500' },
  { title: 'Graph Neural Networks', href: '/ai/gnn', desc: 'Tensorized graph filters', color: 'from-cyan-500 to-blue-500' },
  { title: 'Knowledge Distillation', href: '/ai/transformer', desc: 'TT student, full teacher', color: 'from-pink-500 to-rose-500' },
];

export default function AIPage() {
  return (
    <ContentPage
      category="Module"
      title="Tensor Decomposition for AI"
      subtitle="From foundation models to PEFT and recommender systems"
      description="Tensors provide the mathematical language for compressing, accelerating, and structuring the weights and activations of modern neural networks."
      level="Advanced"
      readTime="~ 6 hours"
      tags={['LLM', 'transformer', 'PEFT', 'LoRA', 'MoE', 'recommender']}
    >
      <Section title="Why tensors matter in AI">
        <p>
          The weights of a neural network are tensors. The activations are tensors.
          The data is a tensor. Modern AI has always been about tensor manipulation —
          but the community has only recently rediscovered <em>structured</em> tensor
          decompositions as a way to compress, accelerate, and reason about models.
        </p>
        <p>
          This module covers the major applications of tensor decompositions to AI:
          LLM compression, parameter-efficient fine-tuning, mixture of experts,
          diffusion, and recommender systems.
        </p>
      </Section>

      <Section title="Topics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 not-prose">
          {topics.map((t, i) => (
            <Link key={t.href} href={t.href}>
              <GlassCard className="p-5 group h-full" hover>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
                <div className="mt-3 flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Explore
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Two paradigms of tensor in AI">
        <div className="grid md:grid-cols-2 gap-3 not-prose">
          <GlassCard className="p-5" hover={false}>
            <Badge variant="gradient" className="mb-2">Compression</Badge>
            <h3 className="font-semibold mb-2">Tensors as approximation</h3>
            <p className="text-sm text-muted-foreground">
              Use CP, Tucker, TT to <em>approximate</em> the trained weights with
              far fewer parameters. The original model is replaced by a low-rank
              version, with negligible accuracy loss. This is the dominant paradigm
              in LLM compression.
            </p>
          </GlassCard>
          <GlassCard className="p-5" hover={false}>
            <Badge variant="new" className="mb-2">Design</Badge>
            <h3 className="font-semibold mb-2">Tensors as architecture</h3>
            <p className="text-sm text-muted-foreground">
              Build a network whose layers are <em>inherently</em> tensor-structured
              (TT-format linear, Tucker convolutions). The model is small by design
              and amenable to fast matrix-product-state operations on specialized
              hardware.
            </p>
          </GlassCard>
        </div>
      </Section>
    </ContentPage>
  );
}
