<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita1873f402a53bf65d4852eed27b2c7e9
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Src\\' => 4,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Src\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInita1873f402a53bf65d4852eed27b2c7e9::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInita1873f402a53bf65d4852eed27b2c7e9::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInita1873f402a53bf65d4852eed27b2c7e9::$classMap;

        }, null, ClassLoader::class);
    }
}
