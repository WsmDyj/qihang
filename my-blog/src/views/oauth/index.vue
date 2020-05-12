<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class  extends Vue {
  created() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=745084b69bda83213a3b&redirect_uri=http://qihang.pro/redirect'
  }
}
</script>
