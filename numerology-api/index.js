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

const calc = (name = '', dadInitial = '', momInitial = '') => {
  let sum = 0;

  const addValue = (str) => {
    for (const c of str.toUpperCase()) {
      if (MAP[c]) sum += MAP[c];
    }
  };

  // Add name
  addValue(name);

  // Add optional initials
  if (dadInitial) addValue(dadInitial);
  if (momInitial) addValue(momInitial);

  // Reduce to single digit
  while (sum > 9) {
    sum = sum
      .toString()
      .split('')
      .reduce((a, b) => a + Number(b), 0);
  }

  return sum;
};

app.post("/numerology", (req, res) => {
  const { name, dadInitial, momInitial } = req.body;

  res.json({
    name,
    dadInitial,
    momInitial,
    number: calc(name, dadInitial, momInitial)
  });
});

app.post("/numerology/bulk", (req, res) => {
  const names = req.body.names || [];

  const result = names.map(item => {
    if (typeof item === 'string') {
      return {
        name: item,
        number: calc(item)
      };
    }

    return {
      name: item.name,
      dadInitial: item.dadInitial,
      momInitial: item.momInitial,
      number: calc(item.name, item.dadInitial, item.momInitial)
    };
  });

  res.json(result);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Numerology API running on port ${PORT}`);
  });
