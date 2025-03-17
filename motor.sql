/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50729 (5.7.29)
 Source Host           : localhost:3306
 Source Schema         : motor

 Target Server Type    : MySQL
 Target Server Version : 50729 (5.7.29)
 File Encoding         : 65001

 Date: 17/03/2025 17:36:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accessory
-- ----------------------------
DROP TABLE IF EXISTS `accessory`;
CREATE TABLE `accessory`  (
  `id` int(10) NOT NULL COMMENT '配件ID',
  `type` tinyint(1) NULL DEFAULT NULL COMMENT '类型',
  `model` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '型号',
  `manufacturer` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '厂家',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '配件表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of accessory
-- ----------------------------
INSERT INTO `accessory` VALUES (1, 1, '1', '1');
INSERT INTO `accessory` VALUES (2, 0, '2', '2');

-- ----------------------------
-- Table structure for base_user
-- ----------------------------
DROP TABLE IF EXISTS `base_user`;
CREATE TABLE `base_user`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `loginname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '登录名',
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态(0:正常，1:冻结)',
  `wx_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信id',
  `create_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '创建者',
  `create_time` bigint(13) UNSIGNED NULL DEFAULT NULL COMMENT '创建日期',
  `update_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '更新者',
  `update_time` bigint(13) UNSIGNED NULL DEFAULT NULL COMMENT '更新日期',
  `deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `delete_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '删除人',
  `delete_time` bigint(13) UNSIGNED NULL DEFAULT NULL COMMENT '逻辑删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户基础表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of base_user
-- ----------------------------
INSERT INTO `base_user` VALUES (1, '超级管理员', 'admin', '1a52e3021956d3a29b915aba33857e9f', 0, 'ojpN76bb_nnXvU-0OEFh5Vd3EXgI', 1, 1586484312546, 1, 1741742753922, 0, 1, 1741742753922);
INSERT INTO `base_user` VALUES (2, '杨豫', 'yangyu', '1a52e3021956d3a29b915aba33857e9f', 0, '', 1, 1624354578788, 2, 1638435680630, 0, 2, 1638435680630);
INSERT INTO `base_user` VALUES (3, '1', '1', '9bf164c470f18efdf7a5bf9be9caa226', 1, NULL, 2, 1625188124736, 2, 1625188127040, 1, 2, 1625188127040);
INSERT INTO `base_user` VALUES (4, '用户1', '1', '9bf164c470f18efdf7a5bf9be9caa226', 1, NULL, 1, 1626059569805, 1, 1626059575617, 1, 1, 1626059575617);
INSERT INTO `base_user` VALUES (5, '1', '1', '9bf164c470f18efdf7a5bf9be9caa226', 0, NULL, 1, 1640653636412, 1, 1640653652074, 1, 1, 1640653652074);
INSERT INTO `base_user` VALUES (6, '清河滩运维', 'qhtyw', '1a52e3021956d3a29b915aba33857e9f', 0, NULL, 3, 1696840464657, NULL, NULL, 0, NULL, NULL);
INSERT INTO `base_user` VALUES (7, '16622125977', '16622125977', '1a52e3021956d3a29b915aba33857e9f', 0, NULL, NULL, NULL, 1, 1726798343615, 0, 1, 1726798343615);
INSERT INTO `base_user` VALUES (8, '18822043824', '18822043824', '1a52e3021956d3a29b915aba33857e9f', 0, NULL, 1, 1726823463876, NULL, NULL, 0, NULL, NULL);
INSERT INTO `base_user` VALUES (9, 'test', 'test', '1a52e3021956d3a29b915aba33857e9f', 0, NULL, 1, 1735279955928, 1, 1736761374919, 0, 1, 1736761374919);

-- ----------------------------
-- Table structure for iac_rel_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `iac_rel_role_resource`;
CREATE TABLE `iac_rel_role_resource`  (
  `role_id` int(10) UNSIGNED NOT NULL COMMENT '角色ID',
  `resource_id` int(10) UNSIGNED NOT NULL COMMENT '资源ID'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色和资源关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of iac_rel_role_resource
-- ----------------------------
INSERT INTO `iac_rel_role_resource` VALUES (1, 1);
INSERT INTO `iac_rel_role_resource` VALUES (1, 2);
INSERT INTO `iac_rel_role_resource` VALUES (1, 3);
INSERT INTO `iac_rel_role_resource` VALUES (1, 4);
INSERT INTO `iac_rel_role_resource` VALUES (1, 5);
INSERT INTO `iac_rel_role_resource` VALUES (1, 6);

-- ----------------------------
-- Table structure for iac_rel_role_user
-- ----------------------------
DROP TABLE IF EXISTS `iac_rel_role_user`;
CREATE TABLE `iac_rel_role_user`  (
  `role_id` int(10) UNSIGNED NOT NULL COMMENT '角色ID',
  `user_id` int(10) UNSIGNED NOT NULL COMMENT '用户ID'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '角色和用户关联表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of iac_rel_role_user
-- ----------------------------
INSERT INTO `iac_rel_role_user` VALUES (1, 1);
INSERT INTO `iac_rel_role_user` VALUES (1, 7);
INSERT INTO `iac_rel_role_user` VALUES (1, 8);
INSERT INTO `iac_rel_role_user` VALUES (2, 9);

-- ----------------------------
-- Table structure for iac_resource
-- ----------------------------
DROP TABLE IF EXISTS `iac_resource`;
CREATE TABLE `iac_resource`  (
  `resource_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `parent_id` int(10) NULL DEFAULT -1 COMMENT '父级id',
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `type` tinyint(1) NULL DEFAULT NULL COMMENT '资源类型(0:菜单，1:权限)',
  `url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单url',
  `icon` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `sort` int(2) NOT NULL DEFAULT 0 COMMENT '排序号',
  `authority` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '对应权限',
  `create_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '创建者',
  `create_time` bigint(13) UNSIGNED NULL DEFAULT NULL COMMENT '创建日期',
  `update_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '更新者',
  `update_time` bigint(13) UNSIGNED NULL DEFAULT NULL COMMENT '更新日期',
  `deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `delete_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '删除人',
  `delete_time` bigint(13) UNSIGNED NULL DEFAULT NULL COMMENT '逻辑删除时间',
  PRIMARY KEY (`resource_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '工商业资源表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of iac_resource
-- ----------------------------
INSERT INTO `iac_resource` VALUES (1, -1, '预置策略查看', 1, NULL, NULL, 0, 'get:iac/strategy/preset', NULL, NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `iac_resource` VALUES (2, -1, '预置策略修改', 1, NULL, NULL, 0, 'put:iac/strategy/preset', NULL, NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `iac_resource` VALUES (3, -1, '计划曲线查看', 1, NULL, NULL, 0, 'get:iac/strategy/plan', NULL, NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `iac_resource` VALUES (4, -1, '计划曲线修改', 1, NULL, NULL, 0, 'put:iac/strategy/plan', NULL, NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `iac_resource` VALUES (5, -1, '定值设置查看', 1, '', '', 0, 'get:iac/value/set', 1, 1726801890869, 1, 1726811724150, 0, 1, 1726811724150);
INSERT INTO `iac_resource` VALUES (6, -1, '定值设置修改', 1, '', '', 0, 'post:iac/valueUpdate', 1, 1726801919590, 1, 1736833188219, 0, 1, 1736833188219);

-- ----------------------------
-- Table structure for iac_role
-- ----------------------------
DROP TABLE IF EXISTS `iac_role`;
CREATE TABLE `iac_role`  (
  `role_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `corp_id` int(10) UNSIGNED NOT NULL COMMENT '公司ID',
  `desc` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '工商业角色表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of iac_role
-- ----------------------------
INSERT INTO `iac_role` VALUES (1, '高级用户', 1, '可修改预置策略', 0);
INSERT INTO `iac_role` VALUES (2, '普通用户', 1, '只能查看储能站数据', 0);

-- ----------------------------
-- Table structure for iac_user
-- ----------------------------
DROP TABLE IF EXISTS `iac_user`;
CREATE TABLE `iac_user`  (
  `user_id` int(10) UNSIGNED NOT NULL COMMENT '主键ID',
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `addr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `age` int(11) NULL DEFAULT 0 COMMENT '年龄',
  `corp_id` int(10) NULL DEFAULT NULL COMMENT '公司ID'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of iac_user
-- ----------------------------
INSERT INTO `iac_user` VALUES (1, '', NULL, 0, 1);
INSERT INTO `iac_user` VALUES (7, '', NULL, 0, 1);
INSERT INTO `iac_user` VALUES (8, '', NULL, 0, 1);
INSERT INTO `iac_user` VALUES (9, '', NULL, 99, 1);

-- ----------------------------
-- Table structure for iot_corp
-- ----------------------------
DROP TABLE IF EXISTS `iot_corp`;
CREATE TABLE `iot_corp`  (
  `corp_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '企业ID',
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '企业名称',
  `login_name` char(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员登录名称',
  `password` char(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员登陆密码',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态(0:正常，1:冻结)',
  `create_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '创建人',
  `create_time` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '创建时间',
  `update_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '更新人',
  `update_time` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) NOT NULL DEFAULT 0 COMMENT '逻辑删除',
  `delete_id` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '删除人',
  `delete_time` bigint(20) UNSIGNED NULL DEFAULT NULL COMMENT '逻辑删除时间',
  PRIMARY KEY (`corp_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '企业表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of iot_corp
-- ----------------------------
INSERT INTO `iot_corp` VALUES (1, '天津平高储能科技有限公司', 'admin', '1a52e3021956d3a29b915aba33857e9f', 0, 1, 1617003608753, 1, 1741142068746, 0, 1, 1741142068746);

-- ----------------------------
-- Table structure for iot_usr
-- ----------------------------
DROP TABLE IF EXISTS `iot_usr`;
CREATE TABLE `iot_usr`  (
  `usr_id` int(10) UNSIGNED NOT NULL COMMENT '用户ID',
  `authentication` tinyint(1) NULL DEFAULT NULL COMMENT '认证状态(0未认证、1已认证)',
  `online` tinyint(1) NULL DEFAULT NULL COMMENT '在线状态(0在线、1离线)',
  `proj_id` int(10) UNSIGNED NOT NULL COMMENT '所属项目',
  `activate_time` bigint(13) UNSIGNED NULL DEFAULT NULL COMMENT '激活时间',
  PRIMARY KEY (`usr_id`) USING BTREE,
  INDEX `fk_usr__proj`(`proj_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of iot_usr
-- ----------------------------
INSERT INTO `iot_usr` VALUES (1, 1, 0, 2, 1723620663705);
INSERT INTO `iot_usr` VALUES (2, NULL, NULL, 2, 1663818499964);
INSERT INTO `iot_usr` VALUES (3, NULL, NULL, 2, NULL);
INSERT INTO `iot_usr` VALUES (4, NULL, NULL, 2, NULL);
INSERT INTO `iot_usr` VALUES (6, NULL, NULL, 3, 1700544725819);

-- ----------------------------
-- Table structure for motor_basic_data
-- ----------------------------
DROP TABLE IF EXISTS `motor_basic_data`;
CREATE TABLE `motor_basic_data`  (
  `id` int(10) NOT NULL COMMENT '电动机ID',
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '区域',
  `position_num` int(10) NULL DEFAULT NULL COMMENT '位号',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '名称',
  `model_num` int(10) NULL DEFAULT NULL COMMENT '型号',
  `frame_num` int(10) NULL DEFAULT NULL COMMENT '机座号',
  `polar_num` int(10) NULL DEFAULT NULL COMMENT '极数',
  `rated_voltage` double(10, 3) NULL DEFAULT NULL COMMENT '额定电压',
  `rated_power` double(10, 3) NULL DEFAULT NULL COMMENT '额定功率',
  `rated_current` double(10, 3) NULL DEFAULT NULL COMMENT '额定电流',
  `rated_speed` int(10) NULL DEFAULT NULL COMMENT '额定转速',
  `de_bearing` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '轴伸端轴承',
  `nde_bearing` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '非轴伸端轴承',
  `factory_num` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '出厂编号',
  `factory_date` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '出厂年月',
  `manufacturer` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '生产厂家',
  `oil_injection_amount` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '注油量(轴伸端/非轴伸端)',
  `oli_injection_period` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '注油周期(轴伸端/非轴伸端)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '电动机基础信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motor_basic_data
-- ----------------------------
INSERT INTO `motor_basic_data` VALUES (1, '11', 22, '33', 111, 111, 111, 111.000, 111.000, 111.000, 111, '111', '111', '111', '111', '111', '111', '111');
INSERT INTO `motor_basic_data` VALUES (2, '12', 23, '34', 222, 222, 222, 222.000, 222.000, 222.000, 222, '222', '222', '222', '222', '222', '222', '222');

-- ----------------------------
-- Table structure for motor_repair_records
-- ----------------------------
DROP TABLE IF EXISTS `motor_repair_records`;
CREATE TABLE `motor_repair_records`  (
  `id` int(10) NOT NULL COMMENT '记录ID',
  `motor_id` int(10) NULL DEFAULT NULL COMMENT '电动机ID',
  `accessory_id` int(10) NULL DEFAULT NULL COMMENT '配件ID',
  `type` tinyint(1) NULL DEFAULT NULL COMMENT '类型',
  `amount` int(10) NULL DEFAULT NULL COMMENT '数量',
  `operator` double(10, 3) NULL DEFAULT NULL COMMENT '操作人',
  `operator_id` int(10) NULL DEFAULT NULL COMMENT '操作人ID',
  `motor_current_calculate_running_time` int(10) NULL DEFAULT NULL COMMENT '电动机当前累计运行时长（分钟）',
  `time` bigint(13) NULL DEFAULT NULL COMMENT '时间',
  `reference_time` int(10) NULL DEFAULT NULL COMMENT '参考时长（分钟）',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '电动机维修记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motor_repair_records
-- ----------------------------
INSERT INTO `motor_repair_records` VALUES (1, 1, 1, 1, 1, 1.000, 1, 1, 1, 1, '1');
INSERT INTO `motor_repair_records` VALUES (2, 2, 2, 2, 2, 2.000, 2, 2, 2, 2, '2');

-- ----------------------------
-- Table structure for motor_running_data
-- ----------------------------
DROP TABLE IF EXISTS `motor_running_data`;
CREATE TABLE `motor_running_data`  (
  `id` int(10) NOT NULL COMMENT 'ID',
  `motor_id` int(10) NULL DEFAULT NULL COMMENT '电动机ID',
  `motor_status` tinyint(3) NULL DEFAULT NULL COMMENT '电动机状态',
  `motor_running_status` tinyint(1) NULL DEFAULT NULL COMMENT '电动机运行状态',
  `motor_start_time` bigint(13) NULL DEFAULT NULL COMMENT '电动机启动时间',
  `motor_stop_time` bigint(13) NULL DEFAULT NULL COMMENT '电动机停止时间',
  `motor_calculate_running_time` int(10) NULL DEFAULT NULL COMMENT '电动机累计运行时长（分钟）',
  `de_running_time` int(10) NULL DEFAULT NULL COMMENT '轴伸端本次运行时长（分钟）',
  `nde_running_time` int(10) NULL DEFAULT NULL COMMENT '非轴伸端本次运行时长（分钟）',
  `bearing_running_time` int(10) NULL DEFAULT NULL COMMENT '轴承本次运行时长(分钟)',
  `de_accumulate_oil_amount` double(10, 3) NULL DEFAULT NULL COMMENT '轴伸端累计加油量',
  `nde_accumulate_oil_amount` double(10, 3) NULL DEFAULT NULL COMMENT '非轴伸端累计加油量',
  `de_reference_time` int(10) NULL DEFAULT NULL COMMENT '轴伸端参考时长（分钟）',
  `nde_reference_time` int(10) NULL DEFAULT NULL COMMENT '非轴伸端参考时长（分钟）',
  `bearing_reference_time` int(10) NULL DEFAULT NULL COMMENT '轴承参考时长（分钟）',
  `de_maintenance_time` bigint(13) NULL DEFAULT NULL COMMENT '轴伸端本次维护时戳',
  `nde_maintenance_time` bigint(13) NULL DEFAULT NULL COMMENT '非轴伸端本次维护时戳',
  `bearing_maintenance_time` bigint(13) NULL DEFAULT NULL COMMENT '轴承本次维护时戳',
  `de_remaining_time` int(10) NULL DEFAULT NULL COMMENT '轴伸端剩余时长（分钟）',
  `nde_remaining_time` int(10) NULL DEFAULT NULL COMMENT '非轴伸端剩余时长（分钟）',
  `bearing_remaining_time` int(10) NULL DEFAULT NULL COMMENT '轴承剩余时长（分钟）',
  `is_collect` tinyint(1) NULL DEFAULT NULL COMMENT '是否采集',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '电动机运行信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motor_running_data
-- ----------------------------
INSERT INTO `motor_running_data` VALUES (1, 1, 1, 1, 1, 1, 1, 120, 150, 300, 2.000, 2.000, 150, 120, 600, NULL, 2, 2, 2, 2, 2, 2);
INSERT INTO `motor_running_data` VALUES (2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3.000, 3.000, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3);

-- ----------------------------
-- Table structure for motor_running_records
-- ----------------------------
DROP TABLE IF EXISTS `motor_running_records`;
CREATE TABLE `motor_running_records`  (
  `id` int(10) NOT NULL COMMENT '记录ID',
  `motor_id` int(10) NULL DEFAULT NULL COMMENT '电动机ID',
  `start_time` bigint(13) NULL DEFAULT NULL COMMENT '启动时间',
  `stop_time` bigint(13) NULL DEFAULT NULL COMMENT '停止时间',
  `motor_calculate_running_time` int(10) NULL DEFAULT NULL COMMENT '电动机累计运行时长（分钟）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '电动机运行记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of motor_running_records
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(10) NOT NULL COMMENT '用户ID',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户名',
  `loginname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '登录名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '密码',
  `create_id` int(10) NULL DEFAULT NULL COMMENT '创建者',
  `create_time` bigint(13) NULL DEFAULT NULL COMMENT '创建时间',
  `update_id` int(10) NULL DEFAULT NULL COMMENT '更新者',
  `update_time` bigint(13) NULL DEFAULT NULL COMMENT '更新时间',
  `status` tinyint(1) NULL DEFAULT NULL COMMENT '状态',
  `deleted` tinyint(1) NULL DEFAULT NULL COMMENT '逻辑删除',
  `delete_id` int(10) NULL DEFAULT NULL COMMENT '删除者',
  `delete_time` bigint(13) NULL DEFAULT NULL COMMENT '删除时间',
  `wx_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '微信ID',
  `phone_number` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '手机号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
