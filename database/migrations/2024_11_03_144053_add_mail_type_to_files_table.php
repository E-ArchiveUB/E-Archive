<?php

// database/migrations/2023_10_31_000000_add_mail_type_to_files_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMailTypeToFilesTable extends Migration
{
    public function up()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->string('mailType')->default('incoming')->after('upload_date');
        });

        // Set 'incoming' as default for existing records without 'mailType'
        DB::table('files')->whereNull('mailType')->update(['mailType' => 'incoming']);
    }

    public function down()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn('mailType');
        });
    }
}
