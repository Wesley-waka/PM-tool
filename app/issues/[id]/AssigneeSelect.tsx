'use client'
import { Issue, User } from '@prisma/client'
import { Select, SelectItem } from '@radix-ui/themes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>('/api/users');
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <>
    <Select.Root
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={(userId) => {
        axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null }).catch(()=>{
          toast.error('Changes could not be saved');
        })
      }}
    >
      <Select.Trigger placeholder='Assign...' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="">Unassigned</Select.Item>
          {users.map(user =>
            <Select.Item key={user.id} value="1">{user.name}</Select.Item>
          )}
          <Select.Item value='1'>Wesley Waka</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster/>
    </>
  )
}

export default AssigneeSelect
