'use client';

/**
 * Componente Simulador - Formulário de contato com redirecionamento para WhatsApp
 * 
 * Este componente permite que o usuário:
 * 1. Escolha um dos serviços disponíveis (quiz)
 * 2. Preencha um formulário com seus dados pessoais
 * 3. Seja redirecionado para o WhatsApp com uma mensagem predefinida
 * 
 * O formulário inclui validação de campos obrigatórios e formatação automática
 * para WhatsApp, CPF e valores monetários.
 */

import React, { useState } from 'react';
import { Building2, Lightbulb, Wallet, Car, User, Mail, Phone, DollarSign, CreditCard, Send } from 'lucide-react';

type SimuladorType = 'consignado' | 'energia' | 'fgts' | 'protecao';
type StepType = 'quiz' | 'formulario';

interface ServicosInfo {
  [key: string]: {
    titulo: string;
    descricao: string;
    icon: React.ReactNode;
    mensagem: string;
  };
}

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  cpf: string;
  valor: string;
}

const SERVICOS: ServicosInfo = {
  consignado: {
    titulo: 'Empréstimo Consignado',
    descricao: 'Empréstimo com desconto em folha de pagamento',
    icon: <Building2 className="w-6 h-6" />,
    mensagem: 'Olá! Gostaria de solicitar uma proposta de Empréstimo Consignado. Meus dados são: ',
  },
  energia: {
    titulo: 'Empréstimo Conta de Energia',
    descricao: 'Empréstimo com débito na conta de energia',
    icon: <Lightbulb className="w-6 h-6" />,
    mensagem: 'Olá! Gostaria de solicitar uma proposta de Empréstimo com débito na conta de energia. Meus dados são: ',
  },
  fgts: {
    titulo: 'Antecipação FGTS',
    descricao: 'Antecipe seu saque aniversário do FGTS',
    icon: <Wallet className="w-6 h-6" />,
    mensagem: 'Olá! Gostaria de solicitar uma proposta de Antecipação do FGTS. Meus dados são: ',
  },
  protecao: {
    titulo: 'Proteção Veicular',
    descricao: 'Proteção completa para seu veículo',
    icon: <Car className="w-6 h-6" />,
    mensagem: 'Olá! Gostaria de solicitar uma proposta de Proteção Veicular. Meus dados são: ',
  },
};

// Substitua pelo número real da empresa no formato internacional (sem o +)
const NUMERO_WHATSAPP = "5582999999999";

export default function Simulador() {
  const [step, setStep] = useState<StepType>('quiz');
  const [servicoSelecionado, setServicoSelecionado] = useState<SimuladorType | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    whatsapp: '',
    cpf: '',
    valor: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Aplica máscara ao WhatsApp
    if (name === 'whatsapp') {
      const numbersOnly = value.replace(/\D/g, '');
      let formatted = numbersOnly;
      
      if (numbersOnly.length > 0) {
        // Formata como (XX) XXXXX-XXXX
        formatted = numbersOnly.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      }
      
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    // Aplica máscara ao CPF
    if (name === 'cpf') {
      const numbersOnly = value.replace(/\D/g, '');
      let formatted = numbersOnly;
      
      if (numbersOnly.length > 0) {
        // Formata como XXX.XXX.XXX-XX
        formatted = numbersOnly.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
      }
      
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    // Aplica máscara para valor em R$
    if (name === 'valor') {
      const numbersOnly = value.replace(/\D/g, '');
      const valorEmCentavos = parseInt(numbersOnly || '0');
      const formatado = (valorEmCentavos / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      
      setFormData({ ...formData, [name]: formatado });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const validarForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email inválido';
    
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp é obrigatório';
    else if (formData.whatsapp.replace(/\D/g, '').length < 11) newErrors.whatsapp = 'WhatsApp inválido';
    
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    else if (formData.cpf.replace(/\D/g, '').length !== 11) newErrors.cpf = 'CPF inválido';
    
    if (!formData.valor.trim()) newErrors.valor = 'Valor é obrigatório';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarForm()) return;
    
    // Prepara a mensagem para o WhatsApp
    const valorNumerico = formData.valor.replace(/[^\d,]/g, '').replace(',', '.');
    const mensagem = encodeURIComponent(
      `${SERVICOS[servicoSelecionado!].mensagem}\n\n` +
      `Nome: ${formData.nome}\n` +
      `Email: ${formData.email}\n` +
      `WhatsApp: ${formData.whatsapp}\n` +
      `CPF: ${formData.cpf}\n` +
      `Valor: ${formData.valor}`
    );
    
    // Redireciona para o WhatsApp
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, '_blank');
  };

  const selecionarServico = (servico: SimuladorType) => {
    setServicoSelecionado(servico);
    setStep('formulario');
    
    // Reseta o formulário e erros
    setFormData({
      nome: '',
      email: '',
      whatsapp: '',
      cpf: '',
      valor: '',
    });
    setErrors({});
  };

  const voltarParaQuiz = () => {
    setStep('quiz');
    setServicoSelecionado(null);
  };

  if (step === 'quiz') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(SERVICOS).map(([key, servico]) => (
            <button
              key={key}
              onClick={() => selecionarServico(key as SimuladorType)}
              className="p-6 glass-effect rounded-xl hover-glow transition-all flex flex-col items-center text-center"
            >
              <div className="text-blue-400 mb-4">
                {servico.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {servico.titulo}
              </h3>
              <p className="text-gray-300 text-sm">
                {servico.descricao}
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto glass-effect p-8 rounded-xl">
      <button
        onClick={voltarParaQuiz}
        className="mb-6 text-gray-300 hover:text-white transition flex items-center gap-2"
      >
        ← Voltar para serviços
      </button>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          {SERVICOS[servicoSelecionado!].titulo}
        </h3>
        <p className="text-gray-300">
          {SERVICOS[servicoSelecionado!].descricao}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            Nome Completo
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${errors.nome ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Digite seu nome completo"
          />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-400" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Digite seu email"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" />
            WhatsApp
          </label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
          {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-400" />
            CPF
          </label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${errors.cpf ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="000.000.000-00"
            maxLength={14}
          />
          {errors.cpf && <p className="mt-1 text-xs text-red-500">{errors.cpf}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            {servicoSelecionado === 'protecao' ? 'Valor do Veículo' : 'Valor Desejado'}
          </label>
          <input
            type="text"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            className={`w-full p-3 bg-gray-800 border ${errors.valor ? 'border-red-500' : 'border-gray-700'} text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="R$ 0,00"
          />
          {errors.valor && <p className="mt-1 text-xs text-red-500">{errors.valor}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover-glow flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Quero uma proposta
        </button>
      </form>
    </div>
  );
} 