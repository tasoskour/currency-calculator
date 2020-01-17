<?php

use Illuminate\Database\Seeder;
use App\ExchangeRate;

class RatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //
      $b_curr=["Euro","Euro","Euro","Us Dollar","Swiss Franc","British Pound"];
      $t_curr=["Us Dollar","Swiss Franc","British Pound","JPY","Us Dollar","CAD"];
      $ex_rates=[1.3764,1.2079,0.8731,76.7200,1.1379,1.5648];
      for ($i = 0; $i <sizeof($b_curr); $i++) {
         ExchangeRate::create([
             'baseCur' =>$b_curr[$i] ,
             'targetCur' =>$t_curr[$i],
             'rate' =>$ex_rates[$i]
         ]);
         ExchangeRate::create([
             'baseCur' =>$t_curr[$i] ,
             'targetCur' =>$b_curr[$i],
             'rate' =>1/$ex_rates[$i]
         ]);

     }
    }
}
