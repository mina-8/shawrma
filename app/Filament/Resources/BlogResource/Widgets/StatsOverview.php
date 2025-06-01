<?php

namespace App\Filament\Resources\BlogResource\Widgets;

use App\Models\Blog;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $charData = [];
        for($i = 6 ; $i >= 0 ; $i--){
            $monthstart = Carbon::now()->subDays($i)->startOfMonth();
            $monthend = Carbon::now()->subDays($i)->endOfMonth();
            $count = Blog::whereBetween('created_at' , [$monthstart , $monthend])->count();
            $charData[] = $count;
        }
        return [
            Stat::make('news', Blog::count())
            ->description('Posts from last 7 days')
            ->chart($charData)
            ->color('success'),

        ];
    }
}
