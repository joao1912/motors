"use client";
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Esquema de validação com zod
const schema = z.object({
    brand: z.string()
        .min(1, { message: 'Este campo é obrigatório.' }),

    model: z.string()
        .min(1, { message: 'Este campo é obrigatório.' }),

    modelYear: z.preprocess(
        (arg) => (arg === '' ? undefined : parseInt(arg as string)),
        z.number()
            .min(1900, { message: 'O ano deve ser maior que 1900.' })
            .max(new Date().getFullYear(), { message: 'O ano não pode ser maior que o ano atual.' })
            .nonnegative({ message: 'O ano não pode ser negativo.' })
            .refine(value => value !== undefined && !isNaN(value), { message: 'Este campo é obrigatório.' })
    ),

    fabYear: z.preprocess(
        (arg) => (arg === '' ? undefined : parseInt(arg as string)), // Converte o valor usando parseInt
        z.number()
            .min(1900, { message: 'O ano deve ser maior que 1900.' })
            .max(new Date().getFullYear(), { message: 'O ano não pode ser maior que o ano atual.' })
            .nonnegative({ message: 'O ano não pode ser negativo.' })
            .refine(value => value !== undefined && !isNaN(value), { message: 'Este campo é obrigatório.' })
    ),

    color: z.string()
        .min(1, { message: 'Este campo é obrigatório.' }),

    fuelType: z.enum(['gasolina', 'etanol', 'flex', 'GNV', 'Diesel', 'outros'], {
        required_error: 'Este campo é obrigatório.',
        invalid_type_error: 'Selecione um tipo de combustível válido.'
    }),

    name: z.string()
        .min(1, { message: 'Este campo é obrigatório.' }),

    telephone: z.string()
        .min(1, { message: 'Este campo é obrigatório.' }),

    cellphone: z.string()
        .min(1, { message: 'Este campo é obrigatório.' }),

    email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Este campo é obrigatório.' }),

    info: z.string()
        .max(120, "calma la meu fi, quer escrever a bribria?")
});

// Inferir tipos do esquema
type FormValues = z.infer<typeof schema>;

const MyFormWithZod: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className="max-w-4xl mx-auto p-8">

            <div className="mx-auto w-64">
                <img src='./imagem.png' className='w-72 ' />
            </div>

            <h1 className='text-2xl font-bold text-center mb-6 p-5 mt-5'>
                AVALIE  O SEU VEÍCULO COM A GENTE:
            </h1>

            <h2 className="text-center mb-24 mt-4 text-xl">
                Preencha o formulário abaixo e tenha a melhor avaliação do mercado
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Dados do Veículo */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Dados do veículo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Brand */}
                        <div className="mb-6">
                            <label htmlFor="brand" className="block text-sm font-medium text-white pl-3">Marca</label>
                            <input
                                id="brand"
                                {...register('brand')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                            />
                            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}
                        </div>

                        {/* Ano da Marca */}
                        <div className='flex items-center gap-5 mb-6'>
                            <div className='w-1/3 min-w-11 whitespace-nowrap'>
                                <label htmlFor="fabYear" className="block text-sm font-medium text-white pl-2">Ano da Fabricação</label>
                                <input
                                    id="fabYear"
                                    {...register('fabYear')}
                                    className={`mt-1 block w-full p-2 border ${errors.fabYear ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                    type='number'
                                />
                                {errors.fabYear && <p className="text-red-500 text-sm mt-1">{errors.fabYear.message}</p>}
                            </div>
                            <span className='text-white pt-6 text-3xl'>
                                /
                            </span>
                            <div className='w-1/3 min-w-11 whitespace-nowrap'>
                                <label htmlFor="modelYear" className="block text-sm font-medium text-white pl-2">Ano Do Modelo</label>
                                <input
                                    id="modelYear"
                                    {...register('modelYear')}
                                    className={`mt-1 block w-full p-2 border ${errors.modelYear ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                    type='number'
                                />
                                {errors.modelYear && <p className="text-red-500 text-sm mt-1">{errors.modelYear.message}</p>}
                            </div>
                        </div>

                        {/* Modelo */}
                        <div className="mb-6">
                            <label htmlFor="model" className="block text-sm font-medium text-white pl-3">Modelo</label>
                            <input
                                id="model"
                                {...register('model')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.model ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                            />
                            {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}
                        </div>

                        {/* Cor */}
                        <div className="mb-6">
                            <label htmlFor="color" className="block text-sm font-medium text-white pl-3">Cor</label>
                            <input
                                id="color"
                                {...register('color')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.color ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                placeholder='Ex: Preto...'
                            />
                            {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>}
                        </div>

                        {/* Tipo de Combustível */}
                        <div className="mb-6">
                            <label htmlFor="fuelType" className="block text-sm font-medium text-white pl-3">Tipo de Combustível</label>
                            <select
                                id="fuelType"
                                {...register('fuelType')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.fuelType ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                            >
                                <option value="">Selecione o combustível...</option>
                                <option value="gasolina">Gasolina</option>
                                <option value="etanol">Etanol</option>
                                <option value="flex">Flex</option>
                                <option value="GNV">GNV</option>
                                <option value="Diesel">Diesel</option>
                                <option value="outros">Outros</option>
                            </select>
                            {errors.fuelType && <p className="text-red-500 text-sm mt-1">{errors.fuelType.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Dados Pessoais */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Dados pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nome */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-white pl-3">Nome</label>
                            <input
                                id="name"
                                {...register('name')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Telefone */}
                        <div className="mb-6">
                            <label htmlFor="telephone" className="block text-sm font-medium text-white pl-3">Telefone</label>
                            <input
                                id="telephone"
                                {...register('telephone')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                            />
                            {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-white pl-3">E-mail</label>
                            <input
                                id="email"
                                {...register('email')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                type='email'
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Celular */}
                        <div className="mb-6">
                            <label htmlFor="cellphone" className="block text-sm font-medium text-white pl-3">Celular</label>
                            <input
                                id="cellphone"
                                {...register('cellphone')}
                                className={`mt-1 block w-8/12 p-2 border ${errors.cellphone ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                            />
                            {errors.cellphone && <p className="text-red-500 text-sm mt-1">{errors.cellphone.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Informações adicionais */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Informações adicionais</h3>
                    <textarea
                        {...register('info')}
                        className={`mt-1 block w-6/12 p-2 border ${errors.info ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black min-w-80`}
                        rows={4}
                    />
                    {errors.info && <p className="text-red-500 text-sm mt-1">{errors.info.message}</p>}
                </div>

                {/* Botão de Enviar */}
                <div className="text-center pt-10 pb-10">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gray-400 text-white pl-3 font-semibold rounded-2xl hover:bg-gray-500 transition w-80 h-11"
                    >
                        Enviar Avaliação
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyFormWithZod;
