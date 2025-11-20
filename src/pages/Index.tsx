import { Activity, Zap, TrendingUp, DollarSign, Gauge, Battery } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { PowerChart } from "@/components/PowerChart";
import { generateTimeSeriesData, unitData } from "@/data/pumpingData";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const chartData = generateTimeSeriesData();

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="bg-dashboard-header text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Análisis de Potencia SRP</h1>
            <p className="text-sm text-white/70 mt-1">Unidad de Bombeo: {unitData.model}</p>
          </div>
          <Badge variant="secondary" className="bg-success/20 text-success border-success/30 px-4 py-2">
            <Activity className="h-4 w-4 mr-1" />
            En Línea
          </Badge>
        </div>
      </header>

      <main className="p-4 max-w-[1024px] mx-auto">
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

        {/* Power and Speed Chart */}
        <div className="mb-4">
          <PowerChart
            title="Potencia Instantánea y Velocidad vs Tiempo"
            data={chartData}
            lines={[
              { dataKey: "power", name: "Potencia (KW)", color: "hsl(var(--chart-1))" },
              { dataKey: "speed", name: "Velocidad", color: "hsl(var(--chart-2))" }
            ]}
          />
        </div>

        {/* Current and Power Chart */}
        <div className="mb-4">
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

        {/* Apparent Power Chart */}
        <div className="mb-4">
          <PowerChart
            title="Potencia Eléctrica Aparente vs Tiempo"
            data={chartData}
            lines={[
              { dataKey: "apparentPower", name: "Potencia Aparente (KVA)", color: "hsl(var(--chart-1))" }
            ]}
          />
        </div>

        {/* Cost Analysis */}
        <div className="grid md:grid-cols-3 gap-3">
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
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
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
      </main>
    </div>
  );
};

export default Index;
