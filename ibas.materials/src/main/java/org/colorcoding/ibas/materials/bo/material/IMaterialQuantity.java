package org.colorcoding.ibas.materials.bo.material;

import java.math.BigDecimal;

/**
 * @author Fancy
 * @date 2017/11/17
 */
public interface IMaterialQuantity {
	/**
	 * 获取-物料编码
	 *
	 * @return
	 */
	String getItemCode();

	/**
	 * 设置-物料编码
	 *
	 * @param value
	 */
	void setItemCode(String value);

	/**
	 * 获取-物料名称
	 * 
	 * @return 值
	 */
	String getItemName();

	/**
	 * 设置-物料名称
	 * 
	 * @param value 值
	 */
	void setItemName(String value);

	/**
	 * 获取-库存
	 *
	 * @return
	 */
	BigDecimal getOnHand();

	/**
	 * 设置库存
	 *
	 * @param value
	 */
	void setOnHand(BigDecimal value);

	/**
	 * 设置库存
	 *
	 * @param value
	 */
	void setOnHand(int value);

	/**
	 * 设置库存
	 *
	 * @param value
	 */
	void setOnHand(double value);

	/**
	 * 获取-已承诺
	 *
	 * @return
	 */
	BigDecimal getOnCommited();

	/**
	 * 设置已承诺
	 *
	 * @param value
	 */
	void setOnCommited(BigDecimal value);

	/**
	 * 设置已承诺
	 *
	 * @param value
	 */
	void setOnCommited(int value);

	/**
	 * 设置已承诺
	 *
	 * @param value
	 */
	void setOnCommited(double value);

	/**
	 * 获取-已订购
	 *
	 * @return
	 */
	BigDecimal getOnOrdered();

	/**
	 * 设置已订购
	 *
	 * @param value
	 */
	void setOnOrdered(BigDecimal value);

	/**
	 * 设置已订购
	 *
	 * @param value
	 */
	void setOnOrdered(int value);

	/**
	 * 设置已订购
	 *
	 * @param value
	 */
	void setOnOrdered(double value);

	/**
	 * 获取库存单位
	 * 
	 * @return
	 */
	String getUOM();

	/**
	 * 设置库存单位
	 * 
	 * @param uom
	 */
	void setUOM(String uom);

	/**
	 * 获取-可用数量（库存数+已订购-已承诺）
	 * 
	 * @return
	 */
	BigDecimal getOnAvailable();
}
