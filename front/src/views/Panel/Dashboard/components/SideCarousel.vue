<script setup lang="ts">
import book1 from '@/assets/dashboard/book-1.jpg'
import book2 from '@/assets/dashboard/book-2.jpg'
import book3 from '@/assets/dashboard/book-3.jpg'

const carouselList: string[] = [
    book1, book2, book3
]

</script>

<template>
    <custom-card  :no-padding="true">
        <template #default>
            <custom-carousel 
                :image-list="carouselList" 
                :height="'160px'" 
                :indicator-position="'none'" 
                :motion-blur="true" 
            />
        </template>
    </custom-card>
</template>