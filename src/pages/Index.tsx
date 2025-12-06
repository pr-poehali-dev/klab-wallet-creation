import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const chartData = [
  { time: '00:00', price: 45.2 },
  { time: '04:00', price: 47.8 },
  { time: '08:00', price: 46.5 },
  { time: '12:00', price: 52.3 },
  { time: '16:00', price: 58.7 },
  { time: '20:00', price: 61.4 },
  { time: '24:00', price: 64.2 },
];

const promotions = [
  { 
    id: 1, 
    title: 'Бонус за регистрацию', 
    description: 'Получите 100 KLAB при первом пополнении от 1000₽', 
    badge: 'Новичкам',
    icon: 'Gift'
  },
  { 
    id: 2, 
    title: 'Удвоение депозита', 
    description: 'При пополнении от 5000₽ получите +50% к балансу', 
    badge: 'Горячее',
    icon: 'TrendingUp'
  },
  { 
    id: 3, 
    title: 'Реферальная программа', 
    description: 'Приглашай друзей и получай 10% от их операций', 
    badge: 'Популярное',
    icon: 'Users'
  },
];

const transactions = [
  { id: 1, type: 'Пополнение', amount: '+500 KLAB', time: '2 часа назад', status: 'completed' },
  { id: 2, type: 'Вывод', amount: '-150 KLAB', time: '5 часов назад', status: 'completed' },
  { id: 3, type: 'Обмен', amount: '+320 KLAB', time: 'Вчера', status: 'completed' },
  { id: 4, type: 'Пополнение', amount: '+1000 KLAB', time: '2 дня назад', status: 'completed' },
];

export default function Index() {
  const [balance, setBalance] = useState(15847.32);
  const [isEditing, setIsEditing] = useState(false);
  const [tempBalance, setTempBalance] = useState(balance.toString());

  const handleEditBalance = () => {
    if (isEditing) {
      const newBalance = parseFloat(tempBalance);
      if (!isNaN(newBalance) && newBalance >= 0) {
        setBalance(newBalance);
      } else {
        setTempBalance(balance.toString());
      }
    }
    setIsEditing(!isEditing);
  };

  const currentPrice = chartData[chartData.length - 1].price;
  const previousPrice = chartData[0].price;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">KLAB Wallet</h1>
              <p className="text-sm text-muted-foreground">Криптокошелек нового поколения</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Icon name="Shield" size={14} />
              2FA
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Icon name="Lock" size={14} />
              Защищено
            </Badge>
          </div>
        </header>

        <Tabs defaultValue="wallet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-card">
            <TabsTrigger value="wallet" className="gap-2">
              <Icon name="Wallet" size={16} />
              Кошелек
            </TabsTrigger>
            <TabsTrigger value="balance" className="gap-2">
              <Icon name="DollarSign" size={16} />
              Баланс
            </TabsTrigger>
            <TabsTrigger value="chart" className="gap-2">
              <Icon name="TrendingUp" size={16} />
              График
            </TabsTrigger>
            <TabsTrigger value="promotions" className="gap-2">
              <Icon name="Sparkles" size={16} />
              Акции
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Icon name="History" size={16} />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-to-br from-primary via-primary/80 to-secondary border-0">
                <CardHeader>
                  <CardTitle className="text-primary-foreground flex items-center justify-between">
                    <span>Ваш баланс</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleEditBalance}
                      className="text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <Icon name={isEditing ? "Check" : "Edit2"} size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={tempBalance}
                      onChange={(e) => setTempBalance(e.target.value)}
                      className="text-4xl font-bold h-16 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground"
                      autoFocus
                    />
                  ) : (
                    <div className="text-5xl font-bold text-primary-foreground mb-2">
                      {balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} KLAB
                    </div>
                  )}
                  <p className="text-primary-foreground/80 text-lg mt-2">
                    ≈ {(balance * currentPrice).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} />
                    Цена KLAB
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-foreground mb-2">
                    ${currentPrice.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={priceChange >= 0 ? "default" : "destructive"} className="gap-1">
                      <Icon name={priceChange >= 0 ? "TrendingUp" : "TrendingDown"} size={14} />
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                    </Badge>
                    <span className="text-sm text-muted-foreground">за 24 часа</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="BarChart3" size={20} />
                  График цены за 24 часа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Button size="lg" className="h-14 gap-2">
                <Icon name="ArrowDownToLine" size={20} />
                Пополнить
              </Button>
              <Button size="lg" variant="outline" className="h-14 gap-2">
                <Icon name="ArrowUpFromLine" size={20} />
                Вывести
              </Button>
              <Button size="lg" variant="outline" className="h-14 gap-2">
                <Icon name="Repeat" size={20} />
                Обменять
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="balance" className="space-y-6">
            <Card className="bg-gradient-to-br from-primary via-primary/80 to-secondary border-0">
              <CardHeader>
                <CardTitle className="text-primary-foreground flex items-center justify-between">
                  <span>Управление балансом</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleEditBalance}
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <Icon name={isEditing ? "Check" : "Edit2"} size={16} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      type="number"
                      value={tempBalance}
                      onChange={(e) => setTempBalance(e.target.value)}
                      className="text-4xl font-bold h-16 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground"
                      placeholder="Введите сумму"
                    />
                    <p className="text-primary-foreground/70">Нажмите галочку, чтобы сохранить</p>
                  </div>
                ) : (
                  <>
                    <div className="text-6xl font-bold text-primary-foreground mb-4">
                      {balance.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-2xl text-primary-foreground/90">KLAB</div>
                    <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                      <p className="text-primary-foreground/80 text-xl">
                        Эквивалент: {(balance * currentPrice).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PiggyBank" size={20} />
                    Всего заработано
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">+2,341.50 KLAB</div>
                  <p className="text-muted-foreground mt-1">За все время</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" size={20} />
                    Средний доход
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">+156.10 KLAB</div>
                  <p className="text-muted-foreground mt-1">В месяц</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chart" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="LineChart" size={20} />
                    График роста KLAB
                  </CardTitle>
                  <Badge variant={priceChange >= 0 ? "default" : "destructive"} className="gap-1 text-lg px-4 py-1">
                    <Icon name={priceChange >= 0 ? "TrendingUp" : "TrendingDown"} size={16} />
                    {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-foreground">${currentPrice.toFixed(2)}</div>
                  <p className="text-muted-foreground mt-1">Текущая цена</p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPriceLarge" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorPriceLarge)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Минимум 24ч</div>
                  <div className="text-2xl font-bold text-foreground mt-1">${Math.min(...chartData.map(d => d.price)).toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Максимум 24ч</div>
                  <div className="text-2xl font-bold text-foreground mt-1">${Math.max(...chartData.map(d => d.price)).toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground">Объем торгов</div>
                  <div className="text-2xl font-bold text-foreground mt-1">$1.2M</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {promotions.map((promo) => (
                <Card key={promo.id} className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon name={promo.icon as any} size={24} className="text-primary" />
                      </div>
                      <Badge variant="secondary">{promo.badge}</Badge>
                    </div>
                    <CardTitle className="mt-4">{promo.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{promo.description}</p>
                    <Button className="w-full gap-2">
                      <Icon name="ArrowRight" size={16} />
                      Участвовать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary rounded-full">
                    <Icon name="Zap" size={32} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">Эксклюзивная акция!</h3>
                    <p className="text-muted-foreground">Торгуйте от 10,000 KLAB и получите премиум-статус бесплатно</p>
                  </div>
                  <Button size="lg">Узнать больше</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  Профиль пользователя
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground">
                    K
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">KLAB User</h3>
                    <p className="text-muted-foreground">ID: KLB-{Math.floor(Math.random() * 100000)}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input value="user@klab.wallet" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Статус</label>
                    <Input value="Премиум" readOnly />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Icon name="Shield" size={18} />
                    Безопасность
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="ShieldCheck" size={20} className="text-primary" />
                        <span>Двухфакторная аутентификация</span>
                      </div>
                      <Badge variant="default">Включена</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Lock" size={20} className="text-primary" />
                        <span>Защита аккаунта</span>
                      </div>
                      <Badge variant="default">Активна</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Smartphone" size={20} className="text-primary" />
                        <span>Привязанные устройства</span>
                      </div>
                      <Badge variant="outline">2 устройства</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={20} />
                  История транзакций
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          tx.type === 'Пополнение' ? 'bg-primary/20' : 
                          tx.type === 'Вывод' ? 'bg-destructive/20' : 'bg-secondary/20'
                        }`}>
                          <Icon 
                            name={
                              tx.type === 'Пополнение' ? 'ArrowDownToLine' : 
                              tx.type === 'Вывод' ? 'ArrowUpFromLine' : 'Repeat'
                            } 
                            size={20} 
                            className={
                              tx.type === 'Пополнение' ? 'text-primary' : 
                              tx.type === 'Вывод' ? 'text-destructive' : 'text-secondary'
                            }
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">{tx.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          tx.amount.startsWith('+') ? 'text-primary' : 'text-destructive'
                        }`}>
                          {tx.amount}
                        </div>
                        <Badge variant="outline" className="mt-1">Завершено</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
