import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const MAP = {
  A:1,B:2,C:3,D:4,E:5,F:8,G:3,H:5,I:1,
  J:1,K:2,L:3,M:4,N:5,O:7,P:8,Q:1,
  R:2,S:3,T:4,U:6,V:6,W:6,X:5,Y:1,Z:7
};

const calc = (name) => {
  let sum = 0;
  for (const c of name.toUpperCase()) if (MAP[c]) sum += MAP[c];
  while (sum > 9) sum = sum.toString().split("").reduce((a,b)=>a+ +b,0);
  return sum;
};

app.post("/numerology", (req,res)=>{
  res.json({ name: req.body.name, number: calc(req.body.name || "") });
});

app.post("/numerology/bulk", (req,res)=>{
  const names = req.body.names || [];
  res.json(names.map(n=>({ name:n, number: calc(n) })));
});

app.listen(process.env.PORT || 3000);
