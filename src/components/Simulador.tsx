'use client';

import React, { useState } from 'react';
import { Calculator, Car, DollarSign, Clock } from 'lucide-react';

type SimuladorType = 'emprestimo' | 'protecao';

export default function Simulador() {
  const [tipoSimulacao, setTipoSimulacao] = useState<SimuladorType>('emprestimo');
  const [valor, setValor] = useState('');
  const [parcelas, setParcelas] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularEmprestimo = () => {
    const valorNum = parseFloat(valor.replace(/\D/g, '')) / 100;
    const parcelasNum = parseInt(parcelas);
    
    // Taxa de juros mensal (exemplo: 1.5%)
    const taxaMensal = 0.015;
    
    // Cálculo da parcela usando a fórmula de amortização
    const parcela = (valorNum * (taxaMensal * Math.pow(1 + taxaMensal, parcelasNum))) / 
                   (Math.pow(1 + taxaMensal, parcelasNum) - 1);
    
    setResultado(parcela);
  };

  const calcularProtecao = () => {
    const valorVeiculo = parseFloat(valor.replace(/\D/g, '')) / 100;
    // Taxa mensal média de 3% do valor do veículo ao ano
    const taxaAnual = 0.03;
    const valorMensal = (valorVeiculo * taxaAnual) / 12;
    
    setResultado(valorMensal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipoSimulacao === 'emprestimo') {
      calcularEmprestimo();
    } else {
      calcularProtecao();
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

  return (
    <div className="w-full max-w-md mx-auto glass-effect p-8 rounded-xl">
      <div className="flex gap-4 mb-8">
        <button
          className={`flex-1 py-3 px-4 rounded-lg transition hover-glow flex items-center justify-center gap-2 ${
            tipoSimulacao === 'emprestimo'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
          onClick={() => setTipoSimulacao('emprestimo')}
        >
          <Calculator className="w-5 h-5" />
          Empréstimo
        </button>
        <button
          className={`flex-1 py-3 px-4 rounded-lg transition hover-glow flex items-center justify-center gap-2 ${
            tipoSimulacao === 'protecao'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300'
          }`}
          onClick={() => setTipoSimulacao('protecao')}
        >
          <Car className="w-5 h-5" />
          Proteção Veicular
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            {tipoSimulacao === 'emprestimo' ? 'Valor do Empréstimo' : 'Valor do Veículo'}
          </label>
          <input
            type="text"
            value={formatarMoeda(valor)}
            onChange={(e) => setValor(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="R$ 0,00"
          />
        </div>

        {tipoSimulacao === 'emprestimo' && (
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
              <option value="72">72x</option>
              <option value="84">84x</option>
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
              {tipoSimulacao === 'emprestimo' ? 'Valor da Parcela:' : 'Mensalidade:'}
            </p>
            <p className="text-2xl font-bold text-blue-400">
              {resultado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
            {tipoSimulacao === 'emprestimo' && parcelas && (
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