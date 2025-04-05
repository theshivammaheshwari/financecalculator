import React, { useState } from 'react';
import { Calculator, RefreshCw, TrendingUp, IndianRupee, Coins, Wallet, ArrowUpRight, Split } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

interface StockEntry {
  units: number;
  price: number;
}

interface Results {
  totalUnits: number;
  averagePrice: number;
  totalAmount: number;
}

interface ExpenseItem {
  type: string;
  amount: number;
}

function TripCalculator() {
  const [distance, setDistance] = useState<number>(530);
  const [fuelEfficiency, setFuelEfficiency] = useState<number>(15);
  const [fuelCostPerLiter, setFuelCostPerLiter] = useState<number>(100);
  const [people, setPeople] = useState<number>(4);
  const [additionalExpenses, setAdditionalExpenses] = useState<ExpenseItem[]>([
    { type: 'Food', amount: 500 }
  ]);
  const [expenseType, setExpenseType] = useState<string>('Food');
  const [expenseAmount, setExpenseAmount] = useState<string>('');

  const fuelRequired = distance / fuelEfficiency;
  const fuelCost = fuelRequired * fuelCostPerLiter;
  
  const totalAdditionalExpenses = additionalExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const totalTripCost = fuelCost + totalAdditionalExpenses;
  
  const costPerPerson = people > 0 ? totalTripCost / people : totalTripCost;

  const handleAddExpense = () => {
    if (expenseAmount && Number(expenseAmount) > 0) {
      setAdditionalExpenses([
        ...additionalExpenses,
        { type: expenseType, amount: Number(expenseAmount) }
      ]);
      setExpenseAmount('');
    }
  };

  const handleRemoveExpense = (index: number) => {
    const updatedExpenses = [...additionalExpenses];
    updatedExpenses.splice(index, 1);
    setAdditionalExpenses(updatedExpenses);
  };

  const pieData = additionalExpenses.reduce((acc, expense) => {
    const existingExpense = acc.find(item => item.name === expense.type);
    if (existingExpense) {
      existingExpense.value += expense.amount;
    } else {
      acc.push({ name: expense.type, value: expense.amount });
    }
    return acc;
  }, [{ name: 'Fuel', value: fuelCost }]);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Total Distance (km)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-28 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fuel Efficiency (km/L)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="30"
                step="0.5"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={fuelEfficiency}
                onChange={(e) => setFuelEfficiency(Number(e.target.value))}
                className="w-28 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fuel Cost per Liter (₹)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="70"
                max="150"
                step="1"
                value={fuelCostPerLiter}
                onChange={(e) => setFuelCostPerLiter(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={fuelCostPerLiter}
                  onChange={(e) => setFuelCostPerLiter(Number(e.target.value))}
                  className="w-28 pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of People
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="w-28 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Additional Expenses</h3>
            <div className="flex gap-2 mb-4">
              <select
                value={expenseType}
                onChange={(e) => setExpenseType(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Food">Food</option>
                <option value="Accommodation">Accommodation</option>
                <option value="Activities">Activities</option>
                <option value="Other">Other</option>
              </select>
              <div className="relative flex-1">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handleAddExpense}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            
            <div className="space-y-2 mt-4">
              {additionalExpenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center bg-white p-3 rounded-md">
                  <span className="text-sm text-gray-600">{expense.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{formatCurrency(expense.amount)}</span>
                    <button 
                      onClick={() => handleRemoveExpense(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-1">Estimated Fuel Cost</h3>
              <p className="text-xl font-semibold text-blue-600">{formatCurrency(fuelCost)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-1">Additional Expenses</h3>
              <p className="text-xl font-semibold text-green-600">{formatCurrency(totalAdditionalExpenses)}</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-1">Total Trip Cost</h3>
              <p className="text-xl font-semibold text-pink-600">{formatCurrency(totalTripCost)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600 mb-1">Cost Per Person</h3>
              <p className="text-xl font-semibold text-purple-600">{formatCurrency(costPerPerson)}</p>
            </div>
          </div>

          <div className="h-64">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trip Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Distance:</span>
                <span className="font-medium">{distance} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Required:</span>
                <span className="font-medium">{fuelRequired.toFixed(2)} liters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Cost:</span>
                <span className="font-medium text-blue-600">{formatCurrency(fuelCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional Expenses:</span>
                <span className="font-medium text-green-600">{formatCurrency(totalAdditionalExpenses)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between">
                <span className="font-semibold">Total Trip Cost:</span>
                <span className="font-semibold text-pink-600">{formatCurrency(totalTripCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Split among {people} people:</span>
                <span className="font-semibold text-purple-600">{formatCurrency(costPerPerson)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StockSplitCalculator() {
  const [currentPrice, setCurrentPrice] = useState<number>(100);
  const [splitRatio, setSplitRatio] = useState<string>("1:2");
  const [sharesOwned, setSharesOwned] = useState<number>(100);
  const [results, setResults] = useState<{
    newPrice: number;
    additionalShares: number;
    totalShares: number;
    refundAmount: number;
  } | null>(null);

  const calculateSplit = () => {
    const [newShares, oldShares] = splitRatio.split(":").map(Number);
    
    if (!newShares || !oldShares || newShares <= 0 || oldShares <= 0) {
      alert("Please enter a valid split ratio (e.g., 1:2)");
      return;
    }

  const splitFactor = newShares / oldShares;

// 1. Calculate Additional Shares
const additionalSharesFloat = (sharesOwned / oldShares) * newShares;
const additionalShares = Math.floor(additionalSharesFloat);

// 2. Total Shares After Split
const totalShares = sharesOwned + additionalShares;

// 3. New Stock Price Calculation
const newPrice = (currentPrice * sharesOwned) / totalShares;

// 4. Fractional Shares & Refund Calculation
const fractionalShares = additionalSharesFloat - additionalShares;
const refundAmount = fractionalShares * newPrice;

setResults({
  newPrice: Number(newPrice.toFixed(2)),
  additionalShares,
  totalShares,
  refundAmount: Number(refundAmount.toFixed(2))
});
};

const clearFields = () => {
  setCurrentPrice(100);
  setSplitRatio("1:2");
  setSharesOwned(100);
  setResults(null);
};

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Current Stock Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">₹</span>
              <input
                type="number"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter current price"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Stock Split Ratio (New Shares:Old Shares)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={splitRatio}
                onChange={(e) => setSplitRatio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 1:2"
              />
              <div className="bg-blue-50 px-3 py-2 rounded-md text-sm text-blue-600">
                Example 1:2
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Number of Shares Owned
            </label>
            <input
              type="number"
              value={sharesOwned}
              onChange={(e) => setSharesOwned(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter number of shares"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={clearFields}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear Fields
            </button>
            <button
              onClick={calculateSplit}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              Calculate
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Split Results</h2>
          {results ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-600">New Stock Price:</span>
                <span className="text-xl font-semibold text-green-600">
                  {formatCurrency(results.newPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-600">Additional Shares:</span>
                <span className="text-xl font-semibold text-blue-600">
                  {results.additionalShares}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-600">Total Shares:</span>
                <span className="text-xl font-semibold text-indigo-600">
                  {results.totalShares}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-gray-600">Refund Amount:</span>
                <span className="text-xl font-semibold text-purple-600">
                  {formatCurrency(results.refundAmount)}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Enter values and click Calculate to see results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StockAverageCalculator() {
  const [entries, setEntries] = useState<StockEntry[]>([
    { units: 0, price: 0 },
    { units: 0, price: 0 }
  ]);
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const updateEntry = (index: number, field: keyof StockEntry, value: number) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const calculateAverage = () => {
    setIsCalculating(true);
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const totalUnits = entries.reduce((sum, entry) => sum + entry.units, 0);
      const totalValue = entries.reduce((sum, entry) => sum + (entry.units * entry.price), 0);
      const averagePrice = totalUnits ? totalValue / totalUnits : 0;

      setResults({
        totalUnits,
        averagePrice,
        totalAmount: totalValue
      });
      setIsCalculating(false);
    }, 500);
  };

  const clearFields = () => {
    setEntries(entries.map(() => ({ units: 0, price: 0 })));
    setResults(null);
  };

  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const calculateInvestment = (entry: StockEntry) => {
    return entry.units * entry.price;
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        {entries.map((entry, index) => (
          <div key={index} 
            className="space-y-4 p-6 rounded-lg border-2 border-transparent hover:border-green-200 transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 ${index === 0 ? 'text-blue-500' : 'text-purple-500'}`} />
              {index === 0 ? 'First Purchase' : 'Second Purchase'}
            </h2>
            
            <div className="transform transition-all duration-300 hover:scale-102">
              <label className="block text-sm font-medium text-gray-700 mb-1">Units</label>
              <input
                type="number"
                value={entry.units || ''}
                onChange={(e) => updateEntry(index, 'units', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300"
              />
            </div>

            <div className="transform transition-all duration-300 hover:scale-102">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per share</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={entry.price || ''}
                  onChange={(e) => updateEntry(index, 'price', parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-300"
                />
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className={`font-medium ${index === 0 ? 'text-blue-600' : 'text-purple-600'}`}>
                  The amount invested in the {index === 0 ? '1st' : '2nd'} purchase:
                </span>
                <span className="font-bold text-gray-900 transition-all duration-300">
                  {formatIndianCurrency(calculateInvestment(entry))}
                </span>
              </div>
            </div>

            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-2"></div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={clearFields}
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Clear Fields
        </button>
        <button
          onClick={calculateAverage}
          disabled={isCalculating}
          className={`px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center gap-2 ${
            isCalculating ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isCalculating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Calculating...</span>
            </>
          ) : (
            'Calculate Average'
          )}
        </button>
      </div>

      {results && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-lg transform transition-all duration-500 animate-fade-in">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 hover:bg-white/50 rounded-lg transition-all duration-300">
              <span className="text-gray-600">Total units</span>
              <span className="text-xl font-bold text-gray-900">
                {results.totalUnits.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-white/50 rounded-lg transition-all duration-300">
              <span className="text-gray-600">Average Price</span>
              <span className="text-xl font-bold text-green-600">
                {formatIndianCurrency(results.averagePrice)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-white/50 rounded-lg transition-all duration-300">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">
                {formatIndianCurrency(results.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EMICalculator() {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(10.5);
  const [time, setTime] = useState<number>(5);
  const [emi, setEMI] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateEMI = () => {
    const P = principal;
    const R = rate / (12 * 100); // Monthly interest rate
    const N = time * 12; // Total number of months

    if (!isNaN(P) && !isNaN(R) && !isNaN(N)) {
      const emiAmount = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
      const totalAmountPayable = emiAmount * N;
      const totalInterestAmount = totalAmountPayable - P;

      setEMI(emiAmount);
      setTotalInterest(totalInterestAmount);
      setTotalAmount(totalAmountPayable);
    }
  };

  React.useEffect(() => {
    calculateEMI();
  }, [principal, rate, time]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const pieData = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest || 0 }
  ];

  const COLORS = ['#4F46E5', '#EF4444'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount: {formatCurrency(principal)}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="100000"
                max="10000000"
                step="100000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate: {rate}% per annum
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="36"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term: {time} Years
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="30"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-indigo-900 mb-4">EMI Details</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Monthly EMI:</span>
                <div className="flex items-center text-indigo-600 font-semibold">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {emi ? formatCurrency(emi) : '-'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <div className="flex items-center text-red-600 font-semibold">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {totalInterest ? formatCurrency(totalInterest) : '-'}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <div className="flex items-center text-green-600 font-semibold">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {totalAmount ? formatCurrency(totalAmount) : '-'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${((value / (principal + (totalInterest || 0))) * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SIPCalculator() {
  const [calculationType, setCalculationType] = useState<'sip' | 'lumpsum' | 'step-up'>('sip');
  const [amount, setAmount] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [rate, setRate] = useState<number>(12);
  const [lumpsum, setLumpsum] = useState<number>(100000);
  const [stepUpRate, setStepUpRate] = useState<number>(10);

  const calculateSIP = () => {
    const monthlyRate = rate / (12 * 100);
    const months = years * 12;
    const futureValue = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = amount * months;
    const totalReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    };
  };

  const calculateStepUpSIP = () => {
    let totalInvestment = 0;
    let futureValue = 0;
    let monthlyAmount = amount;
    const monthlyRate = rate / (12 * 100);

    for (let year = 0; year < years; year++) {
      for (let month = 0; month < 12; month++) {
        totalInvestment += monthlyAmount;
        futureValue = (futureValue + monthlyAmount) * (1 + monthlyRate);
      }
      monthlyAmount += monthlyAmount * (stepUpRate / 100);
    }

    const totalReturns = futureValue - totalInvestment;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    };
  };

  const calculateLumpsum = () => {
    const futureValue = lumpsum * Math.pow(1 + rate / 100, years);
    const totalReturns = futureValue - lumpsum;
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(lumpsum),
      totalReturns: Math.round(totalReturns)
    };
  };

  const result = calculationType === 'sip' 
    ? calculateSIP() 
    : calculationType === 'step-up'
    ? calculateStepUpSIP()
    : calculateLumpsum();

  const pieData = [
    { name: 'Investment', value: result.totalInvestment },
    { name: 'Returns', value: result.totalReturns }
  ];

  const COLORS = ['#4F46E5', '#10B981'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const generateYearlyData = () => {
    const data = [];
    if (calculationType === 'sip') {
      const monthlyRate = rate / (12 * 100);
      for (let year = 0; year <= years; year++) {
        const months = year * 12;
        const investment = amount * months;
        const futureValue = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        data.push({
          year,
          Investment: Math.round(investment),
          'Future Value': Math.round(futureValue)
        });
      }
    } else if (calculationType === 'step-up') {
      let totalInvestment = 0;
      let futureValue = 0;
      let monthlyAmount = amount;
      const monthlyRate = rate / (12 * 100);

      for (let year = 0; year <= years; year++) {
        if (year > 0) {
          for (let month = 0; month < 12; month++) {
            totalInvestment += monthlyAmount;
            futureValue = (futureValue + monthlyAmount) * (1 + monthlyRate);
          }
          monthlyAmount += monthlyAmount * (stepUpRate / 100);
        }
        data.push({
          year,
          Investment: Math.round(totalInvestment),
          'Future Value': Math.round(futureValue)
        });
      }
    } else {
      for (let year = 0; year <= years; year++) {
        const futureValue = lumpsum * Math.pow(1 + rate / 100, year);
        data.push({
          year,
          Investment: lumpsum,
          'Future Value': Math.round(futureValue)
        });
      }
    }
    return data;
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setCalculationType('sip')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            calculationType === 'sip'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Coins className="w-5 h-5" />
          Regular SIP
        </button>
        <button
          onClick={() => setCalculationType('step-up')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            calculationType === 'step-up'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ArrowUpRight className="w-5 h-5" />
          Step-up SIP
        </button>
        <button
          onClick={() => setCalculationType('lumpsum')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
            calculationType === 'lumpsum'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Wallet className="w-5 h-5" />
          Lumpsum
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {calculationType === 'sip' || calculationType === 'step-up' ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Monthly Investment
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-32 pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Lumpsum Amount
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={lumpsum}
                  onChange={(e) => setLumpsum(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={lumpsum}
                    onChange={(e) => setLumpsum(Number(e.target.value))}
                    
                    className="w-32 pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {calculationType === 'step-up' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Annual Step-up Rate (%)
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={stepUpRate}
                  onChange={(e) => setStepUpRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="relative">
                  <input
                    type="number"
                    value={stepUpRate}
                    onChange={(e) => setStepUpRate(Number(e.target.value))}
                    className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-2 text-gray-500">%</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Expected Return Rate (% per annum)
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="range"
                min="1"
                max="30"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="relative">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-3 top-2 text-gray-500">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Investment Period (Years)
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="relative">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-3 top-2 text-gray-500">Yrs</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Investment:</span>
                <span className="text-lg font-semibold text-indigo-600">
                  {formatCurrency(result.totalInvestment)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Returns:</span>
                <span className="text-lg font-semibold text-green-600">
                  {formatCurrency(result.totalReturns)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Future Value:</span>
                <span className="text-lg font-semibold text-blue-600">
                  {formatCurrency(result.futureValue)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={generateYearlyData()}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `₹${(value/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Area
                  type="monotone"
                  dataKey="Investment"
                  stackId="1"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="Future Value"
                  stackId="2"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [calculatorType, setCalculator] = useState<'average' | 'emi' | 'sip' | 'split' | 'trip'>('average');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
          <div className="p-4">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-8">
              <Calculator className="h-6 w-6" />
              Calculators
            </h1>
            <nav className="space-y-2">
              <button
                onClick={() => setCalculator('average')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${
                  calculatorType === 'average' 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                Stock Average
              </button>
              <button
                onClick={() => setCalculator('split')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${
                  calculatorType === 'split' 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Split className="h-5 w-5" />
                Stock Split
              </button>
              <button
                onClick={() => setCalculator('emi')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${
                  calculatorType === 'emi' 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IndianRupee className="h-5 w-5" />
                EMI Calculator
              </button>
              <button
                onClick={() => setCalculator('sip')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${
                  calculatorType === 'sip' 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Coins className="h-5 w-5" />
                SIP Calculator
              </button>
              <button
                onClick={() => setCalculator('trip')}
                className={`w-full text-left px-4 py-2 rounded-md flex items-center gap-2 ${
                  calculatorType === 'trip' 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MapPin className="h-5 w-5" />
                Trip Calculator
              </button>
            </nav>
          </div>
        </div>

        <div className="ml-64 flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                {calculatorType === 'average' ? (
                  <>
                    <Calculator className="w-8 h-8 text-green-600 animate-bounce" />
                    <h1 className="text-3xl font-bold text-gray-800">Stock market average calculator</h1>
                  </>
                ) : calculatorType === 'split' ? (
                  <>
                    <Split className="w-8 h-8 text-green-600 animate-bounce" />
                    <h1 className="text-3xl font-bold text-gray-800">Stock Split Calculator</h1>
                  </>
                ) : calculatorType === 'emi' ? (
                  <>
                    <IndianRupee className="w-8 h-8 text-green-600 animate-bounce" />
                    <h1 className="text-3xl font-bold text-gray-800">EMI Calculator</h1>
                  </>
                ) : calculatorType === 'sip' ? (
                  <>
                    <Coins className="w-8 h-8 text-green-600 animate-bounce" />
                    <h1 className="text-3xl font-bold text-gray-800">SIP Calculator</h1>
                  </>
                ) : (
                  <>
                    <MapPin className="w-8 h-8 text-green-600 animate-bounce" />
                    <h1 className="text-3xl font-bold text-gray-800">Trip Calculator</h1>
                  </>
                )}
              </div>
              
              {calculatorType === 'average' ? (
                <StockAverageCalculator />
              ) : calculatorType === 'split' ? (
                <StockSplitCalculator />
              ) : calculatorType === 'emi' ? (
                <EMICalculator />
              ) : calculatorType === 'sip' ? (
                <SIPCalculator />
              ) : (
                <TripCalculator />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;