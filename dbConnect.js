
import d from 'dotenv'
import { createClient } from '@supabase/supabase-js'

d.config()
let supabase;

export function connect(){
  const url = process.env.URL
  const key = process.env.KEY
  supabase = createClient(url, key)
  console.log('Database connected')
}

export async function addUser(newUser) {
  const { data, error } = await supabase
  .from('users')
  .insert([
    newUser
  ])
}

export async function findUser(username) {
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('username', username)
  return data[0];
}

export async function withdraw(amount, user){
	let newBalance = parseFloat(user.balance) - parseFloat(amount)
	if (newBalance < 0){
		return false;
	} else {
		const { data, error } = await supabase
  		.from('users')
  		.update({ balance: newBalance })
  		.match({ username: user.username})
		return true;
	}
}

export async function deposit(amount, user){
  let newBalance = parseFloat(user.balance) + parseFloat(amount)
  const { data, error } = await supabase
  .from('users')
  .update({ balance: newBalance })
  .match({ username: user.username})
}