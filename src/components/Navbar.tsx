'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full glass-effect z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Logo className="w-8 h-8" />
            <span className="text-2xl font-bold text-gradient">Couraça Digital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#servicos" className="text-gray-300 hover:text-white transition">
              Serviços
            </Link>
            <Link href="#simulador" className="text-gray-300 hover:text-white transition">
              Simulador
            </Link>
            <Link href="#sobre" className="text-gray-300 hover:text-white transition">
              Sobre
            </Link>
            <Link href="#contato" className="text-gray-300 hover:text-white transition">
              Contato
            </Link>
            <Link 
              href="#simulador"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover-glow"
            >
              Simular Agora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden glass-effect rounded-lg mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="#servicos"
                className="block px-3 py-2 text-gray-300 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link
                href="#simulador"
                className="block px-3 py-2 text-gray-300 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Simulador
              </Link>
              <Link
                href="#sobre"
                className="block px-3 py-2 text-gray-300 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="#contato"
                className="block px-3 py-2 text-gray-300 hover:text-white transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <Link
                href="#simulador"
                className="block px-3 py-2 bg-blue-600 text-white rounded-lg hover-glow"
                onClick={() => setIsMenuOpen(false)}
              >
                Simular Agora
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 