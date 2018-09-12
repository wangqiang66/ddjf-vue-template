<template>
    <div class="login-view">
       <DForm  @change="onChange">
            <DFormGroup label="帐号密码">
                <DFormCell label="邮箱" :required="true">
                    <DInput name="email" v-model="email" validate="required|max:30|email" placeholder="请填入邮箱地址" />
                </DFormCell>
                <DFormCell label="密码" :required="true">
                    <DInput name="password" type="password" v-model="password" validate="required|max:30" placeholder="请填入输入登陆蜜码" />
                </DFormCell>
                <DFormCell>
                    <DButton @click="save">保存</DButton>
                </DFormCell>
             </DFormGroup>
        </DForm>
    </div>
</template>
<script>
import { DForm, DFormGroup, DFormCell, DInput, DButton } from '@ddjf/ddui'

export default {
  components: { DForm, DFormGroup, DFormCell, DInput, DButton },
  data() {
    return {
      email: '',
      password: '',
      formState: {}
    }
  },
  methods: {
    save() {
      this.$toast('saved')
    },
    onChange(e) {
      console.log(JSON.stringify(e))
    }
  }
}
</script>
<style lang="scss" scoped>
.login-view {
  margin-top: 2rem;
  padding: 0.15rem;
}
</style>
