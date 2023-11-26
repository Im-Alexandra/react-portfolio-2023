import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const useCollection = (col, _q, _l, _order) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const q = useRef(_q).current;
  const l = useRef(_l).current;
  const order = useRef(_order).current; /* this will be array */

  useEffect(() => {
      setIsPending(true);
      let ref = collection(db, col);

      if (q) {
        ref = query(ref, where(...q));
      }
      if (l) {
        ref = query(ref, limit(l));
      }
      if (order) {
        ref = query(ref, orderBy(...order));
      }

      const unsub = onSnapshot(
        ref,
        async (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          if (results.length > 0) {
            setDocuments(results);
            setError(null);
            setIsPending(false);
          }
        },
        (error) => {
          console.log(error);
          setError("couldnt fetch data");
        }
      );

      return () => unsub();
    
  }, [col, q, l, order]);

  return { documents, error, isPending };
};
