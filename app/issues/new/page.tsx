'use client'
import React, { useState } from 'react'
import {TextField,Button, Text,Callout} from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import SimpleMDE from 'react-simplemde-editor';
import {useForm,Controller} from 'react-hook-form';
import axios from 'axios'
import {zodResolver} from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import { useRouter } from 'next/router';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer <typeof createIssueSchema>;

const Page = () => {
    const router = useRouter();
    const {register,control,handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error,setError] = useState('');

    return (
        <div className='max-w-xl'>
            {error && 
            <Callout.Root color='red' className='mb-5/06    '>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
    <form onSubmit={handleSubmit(async (data) => {
        try {
            await axios.post('/api/issues',data);
            router.push('/issues');
        } catch (error) {
            setError('An unexpected error occurred');
        } })}
    className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Title' {...register('title')}/>
      </TextField.Root>
      {errors.title && (
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        )}
      <Controller
        name="description"
        control={control}
        render={({field})=>(
          <SimpleMDE placeholder='Description' {...field}/>
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default Page
