'use client';

import React, { useState } from 'react';
import { Calculator, Car, DollarSign, Clock, Lightbulb, Building2, Wallet } from 'lucide-react';

type SimuladorType = 'consignado' | 'energia' | 'fgts' | 'protecao';
type StepType = 'quiz' | 'calculadora';

interface ServicosInfo {
  [key: string]: {
    titulo: string;
    descricao: string;
    icon: React.ReactNode;
  };
}

const SERVICOS: ServicosInfo = {
  consignado: {
    titulo: 'Empréstimo Consignado',
    descricao: 'Empréstimo com desconto em folha de pagamento',
    icon: <Building2 className="w-6 h-6" />,
  },
  energia: {
    titulo: 'Empréstimo Conta de Energia',
    descricao: 'Empréstimo com débito na conta de energia',
    icon: <Lightbulb className="w-6 h-6" />,
  },
  fgts: {
    titulo: 'Antecipação FGTS',
    descricao: 'Antecipe seu saque aniversário do FGTS',
    icon: <Wallet className="w-6 h-6" />,
  },
  protecao: {
    titulo: 'Proteção Veicular',
    descricao: 'Proteção completa para seu veículo',
    icon: <Car className="w-6 h-6" />,
  },
};

export default function Simulador() {
  const [step, setStep] = useState<StepType>('quiz');
  const [servicoSelecionado, setServicoSelecionado] = useState<SimuladorType | null>(null);
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularConsignado = () => {
    const valorNum = parseFloat(valor.replace(/\D/g, '')) / 100;
    const parcelasNum = parseInt(parcelas);
    const taxaMensal = 0.015; // 1.5% ao mês
    const parcela = (valorNum * (taxaMensal * Math.pow(1 + taxaMensal, parcelasNum))) / 
                   (Math.pow(1 + taxaMensal, parcelasNum) - 1);
    setResultado(parcela);
  };

  const calcularEnergia = () => {
    const valorNum = parseFloat(valor.replace(/\D/g, '')) / 100;
    const parcelasNum = parseInt(parcelas);
    const taxaMensal = 0.018; // 1.8% ao mês
    const parcela = (valorNum * (taxaMensal * Math.pow(1 + taxaMensal, parcelasNum))) / 
                   (Math.pow(1 + taxaMensal, parcelasNum) - 1);
    setResultado(parcela);
  };

  const calcularFGTS = () => {
    const valorNum = parseFloat(valor.replace(/\D/g, '')) / 100;
    // Taxa de desconto de 2% ao mês
    const taxaDesconto = 0.02;
    const valorAntecipado = valorNum * (1 - taxaDesconto);
    setResultado(valorAntecipado);
  };

  const calcularProtecao = () => {
    const valorVeiculo = parseFloat(valor.replace(/\D/g, '')) / 100;
    const taxaAnual = 0.03; // 3% do valor do veículo ao ano
    const valorMensal = (valorVeiculo * taxaAnual) / 12;
    setResultado(valorMensal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (servicoSelecionado) {
      case 'consignado':
        calcularConsignado();
        break;
      case 'energia':
        calcularEnergia();
        break;
      case 'fgts':
        calcularFGTS();
        break;
      case 'protecao':
        calcularProtecao();
        break;
    }
  };

  const formatarMoeda = (valor: string) => {
    const numero = valor.replace(/\D/g, '');
    const formatado = (parseInt(numero) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    return formatado;
  };

  const selecionarServico = (servico: SimuladorType) => {
    setServicoSelecionado(servico);
    setStep('calculadora');
    setValor('');
    setParcelas('');
    setResultado(null);
  };

  const voltarParaQuiz = () => {
    setStep('quiz');
    setServicoSelecionado(null);
    setValor('');
    setParcelas('');
    setResultado(null);
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
            <DollarSign className="w-4 h-4 text-blue-400" />
            {servicoSelecionado === 'protecao' ? 'Valor do Veículo' : 
             servicoSelecionado === 'fgts' ? 'Valor do FGTS' : 'Valor Desejado'}
          </label>
          <input
            type="text"
            value={formatarMoeda(valor)}
            onChange={(e) => setValor(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="R$ 0,00"
          />
        </div>

        {servicoSelecionado !== 'fgts' && servicoSelecionado !== 'protecao' && (
          <div>
            <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Número de Parcelas
            </label>
            <select
              value={parcelas}
              onChange={(e) => setParcelas(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione</option>
              <option value="12">12x</option>
              <option value="24">24x</option>
              <option value="36">36x</option>
              <option value="48">48x</option>
              <option value="60">60x</option>
              {servicoSelecionado === 'consignado' && (
                <>
                  <option value="72">72x</option>
                  <option value="84">84x</option>
                </>
              )}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover-glow flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calcular
        </button>
      </form>

      {resultado !== null && (
        <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-blue-500/20">
          <h4 className="text-lg font-semibold text-white mb-4">Resultado da Simulação</h4>
          <div className="space-y-2">
            <p className="text-gray-300">
              {servicoSelecionado === 'fgts' ? 'Valor Antecipado:' :
               servicoSelecionado === 'protecao' ? 'Mensalidade:' : 'Valor da Parcela:'}
            </p>
            <p className="text-2xl font-bold text-blue-400">
              {resultado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
            {servicoSelecionado !== 'fgts' && servicoSelecionado !== 'protecao' && parcelas && (
              <p className="text-sm text-gray-400">
                Em {parcelas} parcelas
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 