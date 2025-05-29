<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectLoacation extends Model
{
    use \Spatie\Translatable\HasTranslations;
    protected $fillable = ['location'];
    public $translatable = ['location'];
    protected $casts = [
        'location' => 'array',
    ];
    protected $guarded = ['id'];
    public function projects()
    {
        return $this->hasMany(Project::class, 'project_location_id');
    }
}
