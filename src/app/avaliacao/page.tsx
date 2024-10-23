"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    brand: z.string()
        .min(1, { message: 'Este campo é obrigatório.' })
        .max(50, { message: 'A marca não pode ter mais que 50 caracteres.' }),

    model: z.string()
        .min(1, { message: 'Este campo é obrigatório.' })
        .max(100, { message: 'O modelo não pode ter mais que 100 caracteres.' }),

    modelYear: z.number({
        errorMap: () => {
            return { message: "Este campo é obrigatório." }
        }
    })
        .min(1900, { message: 'Deve ser maior que 1900.' })
        .max(new Date().getFullYear(), { message: `Deve ser menor que ${new Date().getFullYear() + 1}.` })
        .int({ message: 'Valor inválido.' }),

    fabYear: z.number({
        errorMap: () => {
            return { message: "Este campo é obrigatório." }
        }
    })
        .min(1900, { message: 'Deve ser maior que 1900.' })
        .max(new Date().getFullYear(), { message: `Deve ser menor que ${new Date().getFullYear() + 1}.` })
        .int({ message: 'Valor inválido.' }),

    color: z.string()
        .min(1, { message: 'Este campo é obrigatório.' })
        .max(30, { message: 'A cor não pode ter mais que 30 caracteres.' }),

    fuelType: z.enum(['gasolina', 'etanol', 'flex', 'GNV', 'Diesel', 'outros'], {
        errorMap: () => {
            return { message: "Este campo é obrigatório." }
        }
    }),

    name: z.string()
        .min(1, { message: 'Este campo é obrigatório.' })
        .max(100, { message: 'O nome não pode ter mais que 100 caracteres.' }),

    telephone: z.number({
        errorMap: () => {
            return { message: "Este campo é obrigatório." };
        },
    }).refine((value) => value.toString().length >= 10 && value.toString().length <= 15, {
        message: 'O telefone deve ter entre 10 e 15 dígitos.',
    }),

    cellphone: z.number({
        errorMap: () => {
            return { message: "Este campo é obrigatório." };
        },
    }).refine((value) => value.toString().length >= 11 && value.toString().length <= 15, {
        message: 'O celular deve ter entre 11 e 15 dígitos.',
    }),

    email: z.string()
        .email({ message: 'O e-mail deve ser válido.' })
        .min(1, { message: 'Este campo é obrigatório.' })
        .max(100, { message: 'O e-mail não pode ter mais que 100 caracteres.' }),

    info: z.string()
        .max(120, { message: 'As informações adicionais não podem ter mais do que 120 caracteres.' })
        .optional(),
});

type FormValues = z.infer<typeof schema>;

const MyFormWithZod: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        mode: "all",
        reValidateMode: "onChange",
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

                        <div className='flex items-start gap-5 mb-6'>
                            {/* Ano da Fabricação */}
                            <div className='flex flex-col w-1/3 min-w-11'>
                                <label htmlFor="fabYear" className="block text-sm font-medium text-white pl-2">Ano da Fabricação</label>
                                <input
                                    id="fabYear"
                                    {...register('fabYear', {
                                        setValueAs: (value: string) => parseInt(value, 10),
                                    })}
                                    className={`mt-1 block w-full p-2 border ${errors.fabYear ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                    type="number"
                                />
                                <p className={`text-red-500 text-sm mt-1 min-h-[1.25rem]`}>
                                    {errors.fabYear ? errors.fabYear.message : ''}
                                </p>
                            </div>

                            {/* Barra separadora */}
                            <span className='text-white self-center text-3xl'>/</span>

                            {/* Ano do Modelo */}
                            <div className='flex flex-col w-1/3 min-w-11'>
                                <label htmlFor="modelYear" className="block text-sm font-medium text-white pl-2">Ano Do Modelo</label>
                                <input
                                    id="modelYear"
                                    {...register('modelYear', {
                                        setValueAs: (value: string) => parseInt(value, 10),
                                    })}
                                    className={`mt-1 block w-full p-2 border ${errors.modelYear ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                    type="number"
                                />
                                <p className={`text-red-500 text-sm mt-1 min-h-[1.25rem]`}>
                                    {errors.modelYear ? errors.modelYear.message : ''}
                                </p>
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
                                {...register('telephone', {
                                    setValueAs: (value: string) => parseInt(value, 10),
                                })}
                                className={`mt-1 block w-8/12 p-2 border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                type="number"
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
                                {...register('cellphone', {
                                    setValueAs: (value: string) => parseInt(value, 10),
                                })}
                                className={`mt-1 block w-8/12 p-2 border ${errors.cellphone ? 'border-red-500' : 'border-gray-300'} rounded-2xl text-black`}
                                type="number"
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
