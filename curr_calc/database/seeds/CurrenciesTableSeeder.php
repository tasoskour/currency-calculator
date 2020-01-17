<?php

use Illuminate\Database\Seeder;
use App\Currency;

class CurrenciesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //
    $currencies=["Euro","Us Dollar","Swiss Franc","British Pound","JPY","CAD"];
    for ($i = 0; $i <sizeof($currencies); $i++) {
       Currency::create([
           'name' =>$currencies[$i] ,
       ]);
}
    }
}
