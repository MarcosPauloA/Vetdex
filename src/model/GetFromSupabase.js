import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export async function GetDoencasNomes() {
  const { data } = await supabase.from("Doenca").select('doenca_nome, id');
  return data;
}

export async function GetDoencaById(id){
  const { data } = await supabase.from("Doenca").select('*').eq('id', id);
  return data;
}


