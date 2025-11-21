import { Activity, Zap, TrendingUp, DollarSign, Gauge, Battery } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { PowerChart } from "@/components/PowerChart";
import { generateTimeSeriesData, unitData } from "@/data/pumpingData";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const chartData = generateTimeSeriesData();

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <main className="p-4 max-w-[1024px] mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">Análisis de Potencia SRP</h1>
          <p className="text-sm text-muted-foreground mt-1">Unidad de Bombeo: {unitData.model}</p>
        </div>
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <MetricCard
            title="Potencia Promedio"
            value={unitData.averagePower.toFixed(2)}
            unit="KW"
            icon={Zap}
            trend="positive"
          />
          <MetricCard
            title="Eficiencia"
            value={unitData.efficiency.toFixed(0)}
            unit="%"
            icon={TrendingUp}
            trend="positive"
          />
          <MetricCard
            title="Carga del Motor"
            value={unitData.motorLoad.toFixed(2)}
            unit="%"
            icon={Gauge}
            trend="neutral"
          />
          <MetricCard
            title="Factor de Potencia"
            value={unitData.avgPowerFactor.toFixed(2)}
            unit="%"
            icon={Battery}
            trend="neutral"
          />
        </div>

        {/* Power/Speed and Current/Power Charts Side by Side */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <PowerChart
            title="Potencia Instantánea y Velocidad vs Tiempo"
            data={chartData}
            lines={[
              { dataKey: "power", name: "Potencia (KW)", color: "hsl(var(--chart-1))" },
              { dataKey: "speed", name: "Velocidad", color: "hsl(var(--chart-2))" }
            ]}
          />
          <PowerChart
            title="Corriente y Potencia Instantánea vs Tiempo"
            data={chartData}
            lines={[
              { dataKey: "current", name: "Corriente (A)", color: "hsl(var(--chart-3))" },
              { dataKey: "instantaneousPower", name: "Potencia Inst. (W)", color: "hsl(var(--chart-1))" }
            ]}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Motor Slip Chart */}
          <PowerChart
            title="Deslizamiento del Motor"
            data={chartData}
            lines={[
              { dataKey: "slip", name: "Deslizamiento", color: "hsl(var(--chart-4))" }
            ]}
          />

          {/* Power Factor Chart */}
          <PowerChart
            title="Factor de Potencia vs Tiempo"
            data={chartData}
            lines={[
              { dataKey: "powerFactor", name: "Factor de Potencia", color: "hsl(var(--chart-1))" }
            ]}
          />
        </div>

        {/* Apparent Power Chart and Key Metrics */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <PowerChart
            title="Potencia Eléctrica Aparente vs Tiempo"
            data={chartData}
            lines={[
              { dataKey: "apparentPower", name: "Potencia Aparente (KVA)", color: "hsl(var(--chart-1))" }
            ]}
          />
          <div className="grid grid-cols-2 gap-3 content-start">
            <MetricCard
              title="Energía Consumida"
              value={unitData.consumedEnergy.toFixed(2)}
              unit="KWh"
              icon={Battery}
              trend="neutral"
            />
            <MetricCard
              title="Costo Total (sin crédito)"
              value={`$${unitData.totalCostWithoutCredit.toFixed(2)}`}
              unit="/mes"
              icon={DollarSign}
              trend="negative"
            />
            <MetricCard
              title="Costo Total (con crédito)"
              value={`$${unitData.totalCostWithCredit.toFixed(2)}`}
              unit="/mes"
              icon={DollarSign}
              trend="negative"
            />
            <MetricCard
              title="Motorización"
              value={unitData.motorizationPercent.toFixed(2)}
              unit="%"
              trend="positive"
            />
            <MetricCard
              title="Generación"
              value={unitData.generationPercent.toFixed(2)}
              unit="%"
              trend="negative"
            />
            <MetricCard
              title="IRMS"
              value={unitData.rmsCurrents.toFixed(2)}
              unit="A"
              trend="neutral"
            />
            <MetricCard
              title="Factor Carga Cíclico"
              value={unitData.cyclicLoadFactor.toFixed(2)}
              trend="neutral"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
