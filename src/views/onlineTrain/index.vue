<template>
  <div class="app-container">
    <div class="upload-card" style="display: flex; align-items: center;">
      <el-select
        style="width: 20%;"
        v-model="moduleType"
        placeholder="模型类型名称"
        :popper-append-to-body="false"
        popper-class="mode-type-select"
      >
        <el-option
          v-for="item in ModuleTypes"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <CurrentTitle name="样本管理" size="big"/>
    </div>
    <br />
    <div class="upload-card model-training">
      <el-button style="width: 200px; height: 110px;" type="primary" size="small"
        >数据上传</el-button
      >
      <i class="el-icon-right"></i>
      <el-descriptions
        class="margin-top model-info"
        :column="3"
        size="default"
        border
      >
        <template slot="title">
          <el-button
            type="text"
            style="padding: 0px; margin: 0px auto; width: 174vh"
            >模型训练</el-button
          >
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-help"></i>
            模型类型
          </template>
          工装检测模型
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            训练时间
          </template>
          2024-01-20
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-files"></i>
            状态
          </template>
          <el-tag size="small">训练中</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <i class="el-icon-right"></i>
      <el-button style="width: 200px; height: 110px;" type="primary" size="small"
        >转化</el-button
      >
    </div>
    <br />

    <div
      style="display: flex; justify-content: space-between; text-align: center"
    >
      <div style="width: 20%; display: flex; justify-content: start">
        <el-input placeholder="样本搜索"></el-input>
        <el-button
          type="primary"
          @click=""
          style="
            margin-left: 14px;
            margin-right: 12px;
            height: 40px;
            line-height: 16px;
          "
          >搜索</el-button
        >
      </div>
      <div style="text-align: center">
        <el-select
          v-model="moduleType"
          placeholder="模型部署设备选择"
          :popper-append-to-body="false"
          style="margin-right: 14px"
        >
          <el-option
            v-for="item in ModuleTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button
          style="height: 40px; line-height: 16px"
          type="primary"
          @click=""
          >上传数据</el-button
        >
      </div>
    </div>
    <br />

    <div>
      <el-table
        :data="datas"
        element-loading-text="拼命加载中"
        border
        fit
        :header-cell-style="{ background: '#f5f7fa', color: '#3c3c3c' }"
      >
        <el-table-column
          align="center"
          label="序号"
          min-width="8"
          prop="id"
        ></el-table-column>
        <el-table-column
          align="center"
          label="样本名称"
          min-width="8"
          prop="name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="添加日期"
          min-width="8"
          prop="addDate"
        ></el-table-column>
        <el-table-column
          align="center"
          label="所属模型类型"
          min-width="8"
          prop="moduleType"
        ></el-table-column>
        <el-table-column
          align="center"
          label="样本属性(正/负)"
          min-width="8"
          prop="sampleSx"
        ></el-table-column>
        <el-table-column
          align="center"
          label="拥有标签类别"
          min-width="8"
          prop="tagType"
        ></el-table-column>
        <el-table-column
          align="center"
          label="模型标签类别总数"
          min-width="8"
          prop="tagTypeNum"
        ></el-table-column>
        <el-table-column
          align="center"
          label="样本标签数量"
          min-width="8"
          prop="tagNum"
        ></el-table-column>
        <el-table-column
          align="center"
          label="最近修改时间"
          min-width="8"
          prop="modifyDate"
        ></el-table-column>
        <el-table-column align="center" label="管理" min-width="12">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="font-size: 18px"
              @click=""
              >修改</el-button
            >
            <el-button
              size="mini"
              type="primary"
              style="font-size: 18px"
              @click=""
              >查看</el-button
            >
            <el-button
              size="mini"
              type="primary"
              style="font-size: 18px"
              @click=""
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import CurrentTitle from "@/components/CurrentTitle";
export default {
  name: "index",
  components: {
    CurrentTitle,
  },
  data() {
    return {
      moduleType: "",
      ModuleTypes: [
        {
          id: 1,
          name: "工装检测",
        },
      ],
      datas: [],
    };
  },
  created() {
    document.body.style.zoom = "80%";
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      this.api({
        url: "onlineTrainInfo/getList",
        method: "get",
      }).then((data) => {
        console.log(data);
        data.forEach((temp) => {
          if (this.datas != []) {
            const trainData = this.datas.find(
              (atemp) => atemp[0].id == temp.id
            );
            if (trainData != null) {
              trainData.push(temp);
            } else {
              this.datas.push([temp]);
            }
          } else {
            this.datas.push([temp]);
          }
        });

        this.datas.forEach((emm) => {
          let tagName = [];
          emm.forEach((temp) => tagName.push(temp.tagName + " "));
          const tagNum = tagName.length;
          tagName = [...new Set(tagName)]; //去重

          this.datas.push({
            id: emm[0].id,
            tagTypeNum: tagName.length,
            tagNum: tagNum,
            tagType: tagName,
            path: emm[0].path,
            //  moduleType:emm[0].moduleTypeId,
            moduleType: "工装检测",
            moduleTypeStatus: this.ModuleTypes[0].status,
            sampleSx: emm[0].sampleSx,
            addDate: emm[0].addDate,
            modifyDate: emm[0].modifyDate,
            name: emm[0].name,
          });
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">

.upload-card {
  padding: 18px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.19),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border-radius: 10px;
}

.model-training {
  display: flex;
  align-items: center;
}

.model-info {
  margin: 0 18px;
  flex: 1;
  border: 1px solid #409EFF;
  height: 110px;
  padding: 10px;
  border-radius: 6px;
}

.mode-type-select {
  .el-input__inner {
    font-size: 20px;
    color: #000;
    font-weight: bold;
  }
}

.el-icon-right {
  font-size: 30px;
  margin: 0 18px;
  color: #409EFF;
}
</style>
