<template>
    <vue-markdown :source="mdText"></vue-markdown>
</template>

<script>
import axios from 'axios'

export default
{
    name: 'GetMarkdown',
    props: ["src"],
    data: function()
    {
        return ({"mdText": ""});
    },
    mounted()
    {
        axios.get(this.src).then(response => {this.mdText = response.data})
    }
}
</script>

<style lang="scss"></style>