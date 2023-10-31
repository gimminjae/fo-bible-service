<template>
    <div>
        <Head>
            <Meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4493633870090510"
                    crossorigin="anonymous"></script>
            <title>My Bible</title>
        </Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <LayoutHeader/>
        <NuxtPage class="pb-20"/>
        <LayoutFooter/>
    </div>
</template>
<script setup>
import {api} from "~/composables/api";

api.getMe()
</script>