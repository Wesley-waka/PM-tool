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
import Spinner from '@/app/components/Spinner';



type IssueForm = z.infer <typeof createIssueSchema>;

const Page = () => {
    const [isSubmitting,setSubmitting] = useState(false);
    const router = useRouter();
    const {register,control,handleSubmit, formState: {errors}} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error,setError] = useState('');

    const onSubmit = handleSubmit(async (data) => {
      try {
        setSubmitting(true);
        // createIssue(data);
          await axios.post('/api/issues',data);
          router.push('/issues');
      } catch (error) {
        setSubmitting(false);
          setError('An unexpected error occurred');
      } });

    return (
        <div className='max-w-xl'>
            {error && 
            <Callout.Root color='red' className='mb-5/06    '>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
    <form onSubmit={onSubmit}
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
      <Button disabled={isSubmitting}>Submit New Issue{ isSubmitting && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default Page
