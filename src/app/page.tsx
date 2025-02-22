import Link from 'next/link';
import Image from 'next/image';
import Simulador from '@/components/Simulador';
import Navbar from '@/components/Navbar';
import { Calculator, Shield, Clock, CheckCircle2, ArrowRight, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=2070&auto=format&fit=crop"
              alt="Imagem de fundo mostrando conceito de finanças e proteção"
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Soluções Financeiras Inteligentes
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Empréstimo consignado com as melhores taxas do mercado e proteção veicular completa para sua tranquilidade.
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  href="#simulador"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover-glow"
                >
                  <Calculator className="w-5 h-5" />
                  Simular Agora
                </Link>
                <Link 
                  href="#contato"
                  className="flex items-center gap-2 px-6 py-3 border-2 border-white/20 text-white rounded-lg hover:bg-white/10 transition"
                >
                  <ArrowRight className="w-5 h-5" />
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section id="servicos" className="py-16 glass-effect">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gradient mb-12">Nossos Serviços</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-xl glass-effect hover-glow">
                <div className="flex items-center gap-4 mb-6">
                  <Calculator className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Empréstimo Consignado</h3>
                </div>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Melhores taxas do mercado
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Aprovação rápida
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Parcelas descontadas em folha
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Atendimento personalizado
                  </li>
                </ul>
              </div>
              <div className="p-8 rounded-xl glass-effect hover-glow">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Proteção Veicular</h3>
                </div>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Cobertura completa
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Assistência 24 horas
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Rastreamento via GPS
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    Preços competitivos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Simulador Section */}
        <section id="simulador" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gradient mb-12">Simulador</h2>
            <Simulador />
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="py-16 glass-effect">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gradient mb-12">Sobre Nós</h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-300 mb-6">
                A Couraça Digital é uma empresa especializada em soluções financeiras e proteção veicular.
                Nossa missão é proporcionar tranquilidade e segurança financeira para nossos clientes,
                oferecendo as melhores taxas do mercado e um atendimento personalizado.
              </p>
              <p className="text-lg text-gray-300">
                Com anos de experiência no mercado, nossa equipe está preparada para ajudar você
                a encontrar a melhor solução para suas necessidades, seja com empréstimo consignado
                ou proteção veicular.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass-effect py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-6 text-gradient">Couraça Digital</h3>
                <p className="text-gray-300 mb-6">
                  Soluções financeiras e proteção veicular para sua tranquilidade.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white transition">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Contato</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-blue-400" />
                    (XX) XXXX-XXXX
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-blue-400" />
                    contato@couracadigital.com.br
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    Endereço da empresa
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-blue-400" />
                    Segunda a Sexta: 9h às 18h
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Links Rápidos</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="#servicos" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Serviços
                    </Link>
                  </li>
                  <li>
                    <Link href="#simulador" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Simulador
                    </Link>
                  </li>
                  <li>
                    <Link href="#sobre" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Sobre
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-300">
              <p>© 2024 Couraça Digital. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 