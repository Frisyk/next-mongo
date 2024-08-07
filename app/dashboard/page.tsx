import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function Page() {
  const orders = [
    {
      id: 1,
      name: 'Crispy Chicken Burger',
      image: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      orderId: '#123456',
    },
    {
      id: 2,
      name: 'Iced Latte',
      image: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      orderId: '#654321',
    },
    {
      id: 3,
      name: 'Pepperoni Pizza',
      image: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      orderId: '#987654',
    },
  ];
  return (
    <div className="grid gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Topik Belajar Kita</CardTitle>
          <CardDescription>
            Terus Semangat dan Jangan lupa bersyukur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Card key={order.id} className='hover:bg-purple-900 hover:text-white'>
                <CardContent className="flex flex-col justify-between gap-4 py-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Image"
                      className="rounded-md object-cover w-20"
                      height="200"
                      src={order.image}
                      style={{
                        aspectRatio: '64/64',
                        objectFit: 'cover',
                      }}
                      width="200"
                    />
                    <div className="grid flex-1 gap-1">
                      <h3 className="font-semibold">{order.name}</h3>
                      <p className="text-sm text-purple-500">
                        Order ID: {order.orderId}
                      </p>
                    </div>
                  </div>

                  <Button size="sm">Mulai</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
