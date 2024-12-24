import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export interface Question {
  id?: string;
  question: string;
  type: "truth" | "dare";
}

interface UseQuestionsReturn {
  questions: Question[];
  loading: boolean;
  error: PostgrestError | null;
  addQuestion: (newQuestion: Omit<Question, "id">) => Promise<void>;
  removeQuestion: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useQuestions(): UseQuestionsReturn {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("question")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error);
        return;
      }

      setQuestions(data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching questions:", err);
      if (err instanceof Error) {
        setError({
          name: "Error",
          message: err.message,
          details: "",
          hint: "",
          code: "UNKNOWN_ERROR",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const addQuestion = async (newQuestion: Omit<Question, "id">) => {
    try {
      const { data, error: insertError } = await supabase
        .from("question")
        .insert([newQuestion]);

      if (insertError) {
        setError(insertError);
        throw insertError;
      }

      if (data) setQuestions([data[0], ...questions]);
    } catch (err) {
      console.error("Error adding question:", err);
      throw err;
    }
  };

  const removeQuestion = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("question")
        .delete()
        .eq("id", id);

      if (deleteError) {
        setError(deleteError);
        throw deleteError;
      }

      const filteredQuestions = questions.filter(
        (question) => question.id !== id
      );
      setQuestions(filteredQuestions);
    } catch (err) {
      console.error("Error removing question:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return {
    questions,
    loading,
    error,
    addQuestion,
    removeQuestion,
    refetch: fetchQuestions,
  };
}
