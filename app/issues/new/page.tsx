'use client'
import React from 'react'
import {TextField} from '@radix-ui/themes';

const page = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Title'/>
      </TextField.Root>
      <TextArea placeholder='Description'/>
      <Button>Submit New Issue</Button>
    </div>
  )
}

export default page
