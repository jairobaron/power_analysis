// Generate sample data similar to the provided charts
export const generateTimeSeriesData = () => {
  const points = 100;
  const data = [];
  
  for (let i = 0; i < points; i++) {
    const t = (i / points) * 7;
    
    // Simulating the wave patterns from the images
    const power = 45 * Math.sin(2 * Math.PI * t / 7) + 5;
    const speed = power * 1500 - 10000;
    const current = 40000 * Math.sin(2 * Math.PI * t / 7) + 35000;
    const slip = -8 * Math.cos(4 * Math.PI * t / 7);
    const powerFactor = 0.5 * Math.sin(2 * Math.PI * t / 7) + 0.4;
    const apparentPower = 15 + 10 * Math.abs(Math.sin(2 * Math.PI * t / 7));
    
    data.push({
      time: parseFloat(t.toFixed(2)),
      power: parseFloat(power.toFixed(2)),
      speed: parseFloat(speed.toFixed(0)),
      current: parseFloat(current.toFixed(0)),
      instantaneousPower: parseFloat((power * 1000).toFixed(0)),
      slip: parseFloat(slip.toFixed(2)),
      powerFactor: parseFloat(powerFactor.toFixed(2)),
      apparentPower: parseFloat(apparentPower.toFixed(2)),
    });
  }
  
  return data;
};

export const unitData = {
  model: "C-320D-256-120",
  ratedSlip: 8.33,
  ratedTorque: 1718.81,
  averagePower: 4179.33,
  motorizationPercent: 37.83,
  generationPercent: -12.75,
  consumedPower: 10.95,
  generatedPower: -2.77,
  netPower: 8.17,
  efficiency: 51148.13,
  peakApparentPower: 35.42,
  avgApparentPower: 18.18,
  avgPowerFactor: 23.04,
  vsdPower: 6.09,
  cyclicLoadFactor: 2.08,
  activeCurrent: 5.04,
  reactiveCurrent: 21.30,
  rmsCurrents: 23.13,
  motorLoad: 60.88,
  consumedEnergy: 5876.56,
  generatedEnergy: -1489.43,
  costWithoutCredit: 88148.46,
  costWithCredit: 109678.37,
  demandCost: 885.51,
  totalCostWithoutCredit: 89033.96,
  totalCostWithCredit: 110563.87,
};
