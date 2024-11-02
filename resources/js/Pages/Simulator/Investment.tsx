import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import {Slider} from "@/Components/ui/slider";
import {PageProps} from "@/types";
import React, {useEffect, useState} from "react";
import {ChartConfig, ChartContainer, ChartTooltip,} from "@/Components/ui/chart";
import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts";

type InvestmentProps = {
    id: number;
    min_amount: number;
    max_amount: number;
    min_rate: number;
    max_rate: number;
    created_at: string;
    updated_at: string;
};

type Accumulation = {
    year: string;
    amount: number;
};

const Investment = ({
                        investment,
                    }: PageProps<{ investment: InvestmentProps }>) => {
    const [amount, setAmount] = useState(investment.min_amount);
    const [inputAmount, setInputAmount] = useState(amount.toString());

    const [rate, setRate] = useState(investment.min_rate);
    const [inputRate, setInputRate] = useState(rate.toString());

    const [yearlyAccumulation, setYearlyAccumulation] = useState<Accumulation[]>(
        []
    );

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleAmountBlur = () => {
        const value = Number(inputAmount);
        if (value >= investment.min_amount && value <= investment.max_amount) {
            setAmount(value);
        } else {
            setInputAmount(amount.toString());
        }
    };

    const handleRateBlur = () => {
        const value = Number(inputRate);
        if (value >= investment.min_rate && value <= investment.max_rate) {
            setRate(value);
        } else {
            setInputRate(rate.toString());
        }
    };

    const handleAmountSliderChange = (value: number[]) => {
        setAmount(value[0]);
        setInputAmount(value[0].toString());
    };

    const handleRateSliderChange = (value: number[]) => {
        setRate(value[0]);
        setInputRate(value[0].toString());
    };

    useEffect(() => {
        const accumulation: Accumulation[] = [];
        let currentAmount = amount;

        for (let year = 1; year <= 30; year++) {
            currentAmount = currentAmount * (1 + rate / 100);
            accumulation.push({
                year: `N+${year}`,
                amount: parseFloat(currentAmount.toFixed(2)),
            });
        }

        setYearlyAccumulation(accumulation);
    }, [amount, rate]);

    const chartConfig: ChartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
        },
    };

    return (
        <>
            <Card className="w-[350px] m-auto md:w-3/4 mt-6">
                <CardHeader>
                    <CardTitle>Simulateur d'investissement</CardTitle>
                    <CardDescription>
                        Rien de mieux qu'une simulation avant de passer à l'acte
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={"grid md:grid-cols-4"}>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="amount">Montant de l'investissement (€)</Label>
                                    <Input
                                        id="amount-input"
                                        type="number"
                                        placeholder="10000"
                                        min={investment.min_amount}
                                        max={investment.max_amount}
                                        value={inputAmount}
                                        onChange={(e) => setInputAmount(e.target.value)}
                                        onBlur={handleAmountBlur}
                                    />
                                    <Slider
                                        id="amount-slider"
                                        min={investment.min_amount}
                                        max={investment.max_amount}
                                        step={10}
                                        value={[amount]}
                                        onValueChange={handleAmountSliderChange}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="rate">Taux de rendement (%)</Label>
                                    <Input
                                        id="rate-input"
                                        type="number"
                                        placeholder="5"
                                        min={investment.min_rate}
                                        max={investment.max_rate}
                                        value={inputRate}
                                        onChange={(e) => setInputRate(e.target.value)}
                                        onBlur={handleRateBlur}
                                    />
                                    <Slider
                                        id="rate-slider"
                                        min={investment.min_rate}
                                        max={investment.max_rate}
                                        step={0.1}
                                        value={[rate]}
                                        onValueChange={handleRateSliderChange}
                                    />
                                </div>
                            </div>
                        </form>
                        <ChartContainer config={chartConfig} className={"mt-6 md:col-span-3"}>
                            <AreaChart
                                data={yearlyAccumulation}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="year"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    tickFormatter={(value) => value.slice(0, 5)}
                                />
                                <YAxis
                                    hide={isMobile}
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickCount={3}
                                />
                                <ChartTooltip
                                    cursor={true}
                                    content={({active, payload}) => {
                                        if (active && payload && payload.length > 0) {
                                            const {year, amount} = payload[0].payload;
                                            return (
                                                <div className="bg-white border border-gray-300 rounded p-2">
                                                    <p className="text-black">{`Année : ${year}`}</p>
                                                    <p className="text-black">{`Montant : ${amount} €`}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    dataKey="amount"
                                    type="natural"
                                    fill="var(--background)"
                                    fillOpacity={0.8}
                                    stroke="var(--foreground)"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default Investment;
