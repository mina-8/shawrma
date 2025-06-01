## stroage link 
# php artisan stroge:link

## only want to roll back that specific migration file
# php artisan migrate:rollback --path=/database/migrations/2025_05_13_155620_create_about_us_table.php

## to can upload file more than 50mb

# edit config AppServiceProdider file in boot function and edit file php.ini 
<p>
upload_max_filesize = 50M
post_max_size = 60M
</p>

# Config::set('livewire.temporary_file_upload.rules', ['file', 'max:51200']);


## php artisan make:migration add_column_name_to_table_name_table

 $table->foreignId('solve_brands_id')
      ->nullable()
      ->after('id') // 👈 Adds the column after 'id'
      ->constrained('solve_brands')
      ->cascadeOnDelete()
      ->cascadeOnUpdate();
